import type { Locale } from "./config";
import type { CategoryId } from "@/lib/site";

/** Qayta yozilgan bosh sahifa matnlari (brendbuk + Mossman ko'rinishi + Lovekuhnya sotuv usullari).
 *  Avval o'zbekcha; egasi tasdiqlagach ruscha va inglizcha qo'shiladi (hozircha ular o'zbekchani ko'rsatadi).
 *  "2 yil kafolat" faqat 2 joyda: hero.trust va benefits. */
const uz = {
  nav: { catalog: "Katalog", projects: "Loyihalar", factory: "Fabrika", contact: "Bog‘lanish" },
  hero: {
    eyebrow: "Toshkentdagi mebel fabrikasi · 2012-yildan",
    title: "Interyeringiz uchun",
    plate: "mukammal mebel",
    lead: "Oshxona, shkaf, yotoqxona va restoran mebelini o‘lchamingiz bo‘yicha o‘z fabrikamizda yasaymiz. O‘lchab, 3D loyihasini ko‘rsatamiz, keyin tayyorlab, o‘rnatib beramiz.",
    cta1: "Narxini hisoblash",
    cta2: "Ishlarimizni ko‘rish",
    trust: "2 yil kafolat · Safia va Burger Embassy bilan ishlaymiz",
    photo: "«Nest One» majmuasidagi uy: mehmonxona va TV devori",
  },
  stats: [
    { value: "2012", label: "yildan beri ishlaymiz" },
    { value: "1 400 m²", label: "o‘z fabrikamiz" },
    { value: "25 kun", label: "ishlab chiqarish muddati" },
    { value: "10 000+", label: "bajarilgan buyurtma" },
  ],
  catalog: {
    eyebrow: "Katalog",
    title: "Nimalar yasaymiz",
    lead: "Har bir buyum sizning xonangiz uchun alohida chiziladi. Nostandart o‘lcham uchun ustama olmaymiz.",
    go: "Narxini so‘rash",
    all: "Barcha ishlarimiz",
    items: [
      { id: "kitchen", name: "Oshxonalar", img: "/img/projects/p-kitchen.jpg" },
      { id: "wardrobe", name: "Shkaf va garderoblar", img: "/img/projects/p-walkin.jpg" },
      { id: "living", name: "Mehmonxonalar", img: "/img/projects/p-tv-wall.jpg" },
      { id: "bedroom", name: "Yotoqxonalar", img: "/img/projects/p-bedroom.jpg" },
      { id: "horeca", name: "Restoran va kafelar", img: "/img/safia-1.jpg" },
      { id: "bath", name: "Dahliz va hammomlar", img: "/img/projects/p-hall-mirror.jpg" },
    ] as { id: CategoryId; name: string; img: string }[],
  },
  benefits: {
    eyebrow: "Nima olasiz",
    title: "Buyurtmadan o‘rnatishgacha",
    items: [
      { value: "25 kun", title: "Muddat oldindan aniq", text: "O‘lchovdan keyin 25 ish kunidan yasaymiz. Topshirish sanasi shartnomada yoziladi." },
      { value: "3D", title: "Loyiha shartnomadan oldin", text: "Mebel xonangizda qanday turishini va narxini oldindan ko‘rasiz." },
      { value: "1 jamoa", title: "O‘lchov va o‘rnatish o‘zimizdan", text: "O‘lchovchimiz keladi, o‘z brigadamiz yetkazib, o‘rnatadi." },
      { value: "2 yil", title: "Kafolat", text: "Har bir buyurtmaga. Har bir qism jo‘natishdan oldin tekshiriladi." },
    ],
  },
  projects: {
    eyebrow: "Loyihalar",
    title: "Biz yasagan interyerlar",
    nest: {
      title: "«Nest One» majmuasidagi uy",
      text: "Oshxona, mehmonxona, garderob va yotoqxona. Hammasi bitta loyiha bo‘yicha fabrikamizda yasalgan.",
      photos: [
        { src: "/img/editorial/e-living.jpg", cap: "Mehmonxona" },
        { src: "/img/editorial/e-kitchen.jpg", cap: "Oshxona: eman va qovurg‘ali shisha" },
        { src: "/img/editorial/e-walkin.jpg", cap: "Shisha garderob" },
        { src: "/img/editorial/e-nightstand.jpg", cap: "Yotoqxona: yong‘oq tumba" },
      ],
    },
    clients: [
      {
        name: "Safia",
        logo: "/brand/clients/safia-logo.jpg",
        img: "/img/safia-1.jpg",
        text: "70 ta filialga vitrina, peshtaxta va mebel yasadik, 40 dan ortig‘ida eski mebelni yangiladik.",
        stats: [{ value: "70", label: "filial" }, { value: "1,5 yil", label: "hamkorlik" }],
      },
      {
        name: "Burger Embassy",
        logo: "/brand/clients/burger-embassy-logo.jpg",
        img: "/img/cases/embassy.jpg",
        text: "Bir yildan beri tarmoq uchun mebel yasaymiz: 10 dan ortiq restoran to‘liq jihozlandi.",
        stats: [{ value: "10+", label: "restoran" }, { value: "1 yil", label: "hamkorlik" }],
      },
    ],
    all: "Barcha ishlarimiz",
  },
  videos: {
    eyebrow: "Video",
    title: "O‘z ko‘zingiz bilan ko‘ring",
    lead: "Fabrika, muddat va kompaniya haqida qisqa videolar.",
    items: [
      { src: "/video/overview.mp4", cover: 42, title: "Fabrika va ko‘rgazma zali", text: "1 daqiqada: ofis, dastgohlar, tayyor interyerlar" },
      { src: "/video/term-25-days.mp4", cover: 2, title: "25 kun qanday o‘tadi", text: "O‘lchovdan o‘rnatishgacha" },
      { src: "/video/founder.mp4", cover: 2, title: "Asoschi so‘zi", text: "Asror Abdukamolov, Express Mebel asoschisi" },
    ],
    play: "Ko‘rish",
  },
  process: {
    eyebrow: "Ish tartibi",
    title: "6 qadam",
    steps: [
      { title: "Maslahat", text: "Vazifa, byudjet va muddatni aniqlaymiz." },
      { title: "O‘lchov", text: "Uyingiz yoki obyektingizga kelib o‘lchaymiz." },
      { title: "3D loyiha", text: "Ko‘rinishi va narxi shartnomadan oldin tayyor." },
      { title: "Ishlab chiqarish", text: "25 ish kunidan, Homag va CNC dastgohlarida." },
      { title: "Tekshiruv", text: "Har bir qism jo‘natishdan oldin tekshiriladi." },
      { title: "O‘rnatish", text: "Qadoqlab yetkazamiz, o‘z brigadamiz o‘rnatadi." },
    ],
  },
  factory: {
    eyebrow: "Fabrika",
    title: "O‘z fabrikamiz",
    lead: "Kesishdan qadoqlashgacha hammasi o‘zimizda. Shuning uchun muddat va sifatga o‘zimiz javob beramiz.",
    img: "/img/stock/s-cnc.jpg",
    sites: [
      { value: "600 m²", label: "Izza: kesish sexi" },
      { value: "800 m²", label: "Yangiyo‘l: yig‘ish, bo‘yash, qadoqlash" },
    ],
    facts: [
      { title: "Homag", text: "Germaniya dastgohlari" },
      { title: "Nesting", text: "Plitani avtomatik kesish va teshish" },
      { title: "Bazis + CNC", text: "Loyiha to‘g‘ridan-to‘g‘ri dastgohga uzatiladi" },
      { title: "3 000+", text: "RAL va NCS ranglari" },
    ],
  },
  quiz: {
    eyebrow: "Narxni hisoblash",
    title: "5 savol, 1 daqiqa",
    lead: "Javoblaringizga qarab menejer hisob-kitob tayyorlab, siz bilan bog‘lanadi.",
    perks: ["3D loyiha shartnomadan oldin", "Nostandart o‘lcham uchun ustama yo‘q", "Ariza sizni hech narsaga majburlamaydi"],
  },
  contact: {
    eyebrow: "Bog‘lanish",
    title: "Savolingiz bormi?",
    lead: "Raqamingizni qoldiring, menejer qo‘ng‘iroq qiladi. Yoki o‘zingiz qo‘ng‘iroq qiling.",
    phoneLabel: "Telefon",
    officeLabel: "Ofis",
    address: "Toshkent, Olmazor tumani, Jomiy ko‘chasi, 5-uy",
  },
};

export type Home2 = typeof uz;

export const home2: Record<Locale, Home2> = { uz, ru: uz, en: uz };
