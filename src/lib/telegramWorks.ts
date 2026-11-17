import "server-only";
import { cacheLife } from "next/cache";
import { contacts } from "./site";
import { works as curated, type Work, type WorkStyle } from "./works";

/**
 * New posts in the Telegram catalogue channel appear on the site by themselves.
 * The public channel preview (t.me/s/…) is read at most once an hour; posts newer than
 * the hand-curated list in works.ts are added on top. Photos are served from Telegram's CDN.
 *
 * Category: a hashtag in the post wins (#oshxona #shkaf #mehmonxona #yotoqxona, or the
 * Russian #кухня #шкаф #гостиная #спальня); otherwise it is guessed from the text.
 */
const CHANNEL = new URL(contacts.telegramCatalog).pathname.slice(1);
const LAST_CURATED = Math.max(...curated.map((w) => w.id));

const TAGS: [Work["category"], RegExp][] = [
  ["kitchen", /#(oshxona|кухн[яи]|kitchen)/i],
  ["wardrobe", /#(shkaf|garderob|dahliz|шкаф|гардероб|прихож)/i],
  ["living", /#(mehmonxona|gostinaya|гостин|tv|тв)/i],
  ["bedroom", /#(yotoqxona|спальн|bedroom)/i],
];
const BRANDS: [string, RegExp][] = [
  ["Blum", /Blum/i], ["Hettich", /Hettich/i], ["GENC", /GENC/i], ["Ultradecor", /Ultradecor/i], ["Starax", /Starax/i], ["Teddy", /Teddy/i],
];

function category(text: string): Work["category"] {
  for (const [c, re] of TAGS) if (re.test(text)) return c;
  if (/спальн|матрас|кроват/i.test(text)) return "bedroom";
  if (/под\s*тв|гостин|шпон|ткань/i.test(text)) return "living";
  if (/шкаф|гардероб|прихож/i.test(text)) return "wardrobe";
  return "kitchen";
}

function style(text: string): WorkStyle {
  const model = text.match(/Модель:\s*([^\n]+)/)?.[1] ?? "";
  if (/neo/i.test(model)) return "neo";
  if (/модерн|modern/i.test(model)) return "modern";
  if (/класс|classic/i.test(model)) return "classic";
  return "hitech";
}

function parse(html: string): Work[] {
  const out: Work[] = [];
  for (const block of html.split('<div class="tgme_widget_message_wrap').slice(1)) {
    const id = Number(block.match(new RegExp(`data-post="${CHANNEL}/(\\d+)"`, "i"))?.[1]);
    if (!id || id <= LAST_CURATED) continue;
    const photos = [...block.matchAll(/tgme_widget_message_photo_wrap[^>]*background-image:url\('(https:\/\/[^']+)'\)/g)].map((m) => m[1]);
    if (!photos.length) continue;
    const text = (block.match(/<div class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? "")
      .replace(/<br\s*\/?>/g, "\n")
      .replace(/<[^>]+>/g, "");
    out.push({ id, category: category(text), style: style(text), brands: BRANDS.filter(([, re]) => re.test(text)).map(([n]) => n), photos });
  }
  return out;
}

async function fetchNewPosts(): Promise<Work[]> {
  "use cache";
  cacheLife("hours");
  const found = new Map<number, Work>();
  let before = "";
  try {
    // Newest posts come first; walk back a few pages until we reach the curated ones.
    for (let page = 0; page < 5; page++) {
      const res = await fetch(`https://t.me/s/${CHANNEL}${before}`, { signal: AbortSignal.timeout(8000) });
      if (!res.ok) break;
      const html = await res.text();
      const ids = [...html.matchAll(new RegExp(`data-post="${CHANNEL}/(\\d+)"`, "gi"))].map((m) => Number(m[1]));
      for (const w of parse(html)) found.set(w.id, w);
      const oldest = Math.min(...ids);
      if (!ids.length || oldest <= LAST_CURATED) break;
      before = `?before=${oldest}`;
    }
  } catch {
    // Telegram unreachable: show the curated list only.
  }
  return [...found.values()].sort((a, b) => b.id - a.id);
}

/** All works: new channel posts first, then the curated list. */
export async function getWorks(): Promise<Work[]> {
  const fresh = await fetchNewPosts();
  const seen = new Set(fresh.map((w) => w.id));
  return [...fresh, ...curated.filter((w) => !seen.has(w.id))];
}
