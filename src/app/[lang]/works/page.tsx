import { permanentRedirect } from "next/navigation";

/** Eski manzil: /works endi /projects (2026-11-25). */
export default async function WorksRedirect({ params }: PageProps<"/[lang]/works">) {
  const { lang } = await params;
  permanentRedirect(`/${lang}/projects`);
}
