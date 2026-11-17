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
5. Push'dan keyin foydalanuvchiga commit nomini (hash va xabar) aytiladi.

Railway `main` ga har bir push'dan keyin saytni o'zi qayta joylaydi, shuning uchun build xatosi bilan push qilish saytni buzadi.

## Eslatmalar
- O'zbekcha matn adabiy tilda, ruscha so'zlarsiz yoziladi ("smeta" emas "hisob-kitob", "montaj" emas "o'rnatish", "kvartira" emas "uy"); o‘ g‘ uchun ‘ (U+2018), tutuq belgisi uchun ’ (U+2019).
- Ranglar: zumrad fon, logotip firuzasi #008E9B (brend detallari), oltin gradient faqat tugma va va'dalarda. Shriftlar: Playfair Display + Onest.
- Kalitlar (Telegram, CRM, analitika) faqat `.env.local` / Railway Variables'da — repoga tushmaydi (`.env.example` ga qarang).
- Dev serverda CSS o'zgarmay qolsa: serverni to'xtatib, `.next` papkasini o'chirib, qayta ishga tushiring.
