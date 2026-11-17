# Express Mebel B2B — sayt

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4.

## Ishga tushirish

```bash
npm install
npm run dev        # http://localhost:3000 → /uz, /ru yoki /en ga yo'naltiradi
npm run build      # production build
```

## Tuzilma
- `src/i18n/uz.ts`, `ru.ts`, `en.ts` — barcha matnlar (uz — asosiy, qolganlari shu tipga mos bo'lishi shart)
- `src/app/[lang]/page.tsx` — bosh sahifa bo'limlari
- `src/components/` — Header, Segments (tablar), LeadForm (ariza), Analytics (Pixel/GA4/Metrika)
- `src/app/api/lead/route.ts` + `src/lib/leads.ts` — arizalar: Telegram va ERP/CRM webhook
- `src/proxy.ts` — brauzer tiliga qarab /uz, /ru, /en ga yo'naltirish
- `public/img`, `public/brand` — rasmlar va logotiplar

## Sozlash
`.env.example` ni `.env.local` ga nusxalab to'ldiring:
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` — arizalar Telegram guruhga
- `CRM_WEBHOOK_URL`, `CRM_API_TOKEN` — ERP ichidagi CRM ga (API hujjati kelgach `toCrm` da maydonlar moslanadi)
- `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_YANDEX_METRIKA_ID` — target reklama uchun

Hech qanday kanal sozlanmagan bo'lsa, dev rejimida ariza konsolga yoziladi; production'da xato qaytariladi (ariza yo'qolmasligi uchun).
