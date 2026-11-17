@AGENTS.md

# Express Mebel — sayt (expressmebel-uz)

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4. Tillar: uz (asosiy), ru, en — matnlar `src/i18n/*.ts` da.
Repo: https://github.com/asrorabdukamolov-pixel/expressmebel-uz (branch `main`), deploy: Railway (GitHub'dan avtomatik).

## Doimiy qoida: har bir o'zgarishdan keyin GitHub'ga push

Saytdagi har bir o'zgarish tugagach, so'ramasdan:

1. `npm run build` — xatosiz o'tishi shart. Xato bo'lsa **push qilinmaydi**: avval tuzatiladi, keyin qayta build.
2. `git add -A`
3. `git commit -m "<nima o'zgargani, qisqa>"`
4. `git push origin main`
5. `npx.cmd --yes vercel@latest deploy --prod --yes` — sayt hozircha Vercel'da (https://expressmebel.vercel.app), u GitHub'ga ulanmagan, shuning uchun har push'dan keyin qo'lda joylanadi. Railway ulangach, bu qadam kerak bo'lmaydi.
6. Push'dan keyin foydalanuvchiga commit nomini (hash va xabar) aytiladi.

Railway `main` ga har bir push'dan keyin saytni o'zi qayta joylaydi, shuning uchun build xatosi bilan push qilish saytni buzadi.

## Eslatmalar
- O'zbekcha matn adabiy tilda, ruscha so'zlarsiz yoziladi ("smeta" emas "hisob-kitob", "montaj" emas "o'rnatish", "kvartira" emas "uy"); o‘ g‘ uchun ‘ (U+2018), tutuq belgisi uchun ’ (U+2019).
- Ranglar: 60% zumrad fon, 30% iliq fil suyagi (#F6F2EA), 10% aksent. Logotip firuzasi #008E9B faqat mayda detallarda. To'q "sochniy" oltin (`--gold-grad`) faqat tugma, chip va progress'da; sarlavhadagi so'zlar va raqamlarda yumshoq shampan oltini (`--champagne-grad`). Yangi rang qo'shilmaydi. Shriftlar: Playfair Display + Onest.
- Kalitlar (Telegram, CRM, analitika) faqat `.env.local` / Railway Variables'da — repoga tushmaydi (`.env.example` ga qarang).
- Hujjatlar bloki: `public/docs/` ga PDF yoki JPG/PNG/WEBP qo'yilsa, saytda avtomatik chiqadi (nom fayl nomidan, boshidagi raqam tartibni belgilaydi: `01-Sertifikat.pdf`). Papka bo'sh bo'lsa, bo'lim ko'rinmaydi.
- Ishlarimiz katalogi (`/[lang]/works`): `src/lib/works.ts` dagi 43 ta tanlangan loyiha + Telegram kanal (t.me/Express_Mebel_Katalog) dagi yangi postlar soatiga bir marta avtomatik qo'shiladi (`src/lib/telegramWorks.ts`). Turkum xeshtegdan (#oshxona #shkaf #mehmonxona #yotoqxona), bo'lmasa matndan aniqlanadi.
- Burger Embassy keys rasmi: `public/img/cases/embassy.jpg` — hozircha litsenziyali stok surat, haqiqiy filial surati kelganda shu fayl almashtiriladi.
- Dev serverda CSS o'zgarmay qolsa: serverni to'xtatib, `.next` papkasini o'chirib, qayta ishga tushiring.
