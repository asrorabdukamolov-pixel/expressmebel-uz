import type { Locale } from "./config";
import type { CategoryId, SegmentId } from "@/lib/site";

/** Bosh sahifa matnlari, 3-variant (premium). Qisqa, aniq, odamcha.
 *  Avval o'zbekcha; egasi tasdiqlagach ruscha va inglizcha qo'shiladi (hozircha ular o'zbekchani ko'rsatadi).
 *  "2 yil kafolat": benefits va "Uyingiz uchun" kartasi (2 marta). */
const uz = {
  nav: { catalog: "Katalog", projects: "Loyihalar", factory: "Fabrika", contact: "Bog‘lanish" },
  hero: {
    eyebrow: "Express Mebel · Toshkent · 2012-yildan",
    title: "Siz orzu qiling,",
    plate: "biz amalga oshiramiz",
    lead: "Oshxona, garderob va butun uy mebeli xonangiz o‘lchamida, o‘z fabrikamizda yasaladi. 3D loyihani bepul tayyorlaymiz, topshirish sanasi shartnomaga yoziladi.",
    cta1: "Narxini hisoblash",
    cta2: "Ishlarimiz",
    photo: "Express Mebel: fabrika va tayyor interyerlar",
    stats: [
      { value: "2012", label: "yildan beri" },
      { value: "1 400 m²", label: "o‘z fabrikamiz" },
      { value: "25 kun", label: "tayyorlash muddati" },
    ],
  },
  marquee: ["Oshxonalar", "Garderoblar", "Yotoqxonalar", "Mehmonxonalar", "Restoran va kafelar", "Ofislar", "3D loyiha bepul", "25 ish kuni"],
  about: {
    eyebrow: "Missiyamiz",
    before: "Individual yechim, yuqori sifat va mukammal dizayn orqali har bir inson uchun",
    accent: "orzusidagi yashash makonini",
    after: "yaratish.",
    valuesTitle: "Qadriyatlarimiz va ularning isboti",
    values: [
      { title: "Hammaga hurmat", proof: "O‘lchovchidan o‘rnatuvchigacha bitta jamoa sizga javob beradi" },
      { title: "To‘g‘ri, halol ishlaymiz", proof: "Narx shartnomagacha ma’lum, muddat shartnomaga yoziladi" },
      { title: "Kechagidan yaxshiroq", proof: "Homag va CNC dastgohlari, har bir buyurtmada sifat nazorati" },
      { title: "Va’dani bajaramiz", proof: "25 ish kuni: topshirish sanasini oldindan aytamiz" },
      { title: "Baxtli mijoz, baxtli xodim, baxtli jamiyat", proof: "Safia bilan 1,5 yil, Burger Embassy bilan 1 yildan beri" },
    ],
    facts: [
      { value: "10 000+", label: "bajarilgan buyurtma" },
      { value: "1 jamoa", label: "o‘lchovdan o‘rnatishgacha" },
      { value: "3 000+", label: "RAL va NCS ranglari" },
    ],
  },
  segments: {
    eyebrow: "Kim uchun",
    title: "Har bir mijozga o‘z yondashuvi",
    items: [
      { id: "home", label: "Uyingiz uchun", title: "Mehmonlaringiz so‘raydi: qayerdan buyurtma qildingiz?", text: "Har bir santimetr xonangizga chiziladi. 3D loyihani bepul ko‘rasiz, o‘rnatgandan keyin 2 yil kafolat.", img: "/img/projects/p-dining.jpg" },
      { id: "horeca", label: "Restoran va kafelar", title: "Har kuni yuzlab mijozga xizmat qiladigan sifatli mebel", text: "Safia’ning 70 filiali va Burger Embassy’ning 10 dan ortiq restorani bizning mebelimizda ishlaydi. Har filialda bir xil sifat.", img: "/img/safia-2.jpg" },
      { id: "build", label: "Biznes va quruvchilar", title: "25 ish kuni, bitta pudratchi, aniq hisob", text: "Ishlab chiqarish jadvali qurilish grafigiga moslanadi. Ko‘p xonadonli buyurtmalarni bosqichma-bosqich yetkazamiz.", img: "/img/works/495-1.jpg" },
      { id: "design", label: "Dizaynerlar", title: "Chizmangiz millimetrigacha bajariladi", text: "3 000 dan ortiq RAL va NCS rang, Homag dastgohlari. Loyihangiz aynan siz chizgandek bo‘ladi.", img: "/img/editorial/e-table.jpg" },
    ] as { id: "home" | SegmentId; label: string; title: string; text: string; img: string }[],
    go: "Ariza qoldirish",
  },
  dream: {
    eyebrow: "Orzudan haqiqatga",
    title: "G‘oya qanday qilib mebelga aylanadi",
    lead: "Chiziqni suring: chapda g‘oya, o‘ngda tayyor oshxona. Avval 3D loyihada ko‘rasiz, keyin uyingizda.",
    points: ["3D loyiha bepul", "Rang va materialni loyihada tanlaysiz", "Natija loyihadagidek bo‘ladi"],
    img: "/img/projects/p-kitchen.jpg",
    dreamLabel: "Orzu",
    realLabel: "Haqiqat",
    hint: "Suring: orzudan haqiqatga",
  },
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
  nest: {
    eyebrow: "Loyiha",
    title: "«Nest One» majmuasidagi uy",
    text: "Oshxona, mehmonxona, garderob va yotoqxona. Bitta loyiha, bitta fabrika, bitta jamoa.",
    photos: [
      { src: "/img/editorial/e-dining.jpg", cap: "Ovqatlanish zonasi" },
      { src: "/img/projects/p-walkin-2.jpg", cap: "Shisha garderob" },
      { src: "/img/projects/p-study-oak.jpg", cap: "Ish xonasi: eman" },
      { src: "/img/editorial/e-nightstand.jpg", cap: "Yotoqxona: yong‘oq tumba" },
      { src: "/img/editorial/e-mirror.jpg", cap: "Dahliz: oyna va yoritish" },
      { src: "/img/editorial/e-table.jpg", cap: "Jurnal stoli" },
      { src: "/img/projects/p-study-white.jpg", cap: "Ish joyi va shkaflar" },
    ],
    prev: "Oldingi",
    next: "Keyingi",
  },
  clients: {
    eyebrow: "Hamkorlar",
    title: "Yetakchi tarmoqlar bizni tanlaydi",
    items: [
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
  },
  benefits: {
    eyebrow: "Nega Express Mebel",
    title: "Nega bizni tanlashadi",
    img: "/img/editorial/e-shelf.jpg",
    items: [
      { value: "1 400 m²", title: "O‘z fabrikamiz", text: "Kesishdan qadoqlashgacha hammasi o‘zimizda: muddat va sifat boshqalarga bog‘liq emas." },
      { value: "Bepul", title: "3D loyiha", text: "Mebel xonangizda qanday turishi va narxini pul to‘lashdan oldin ko‘rasiz." },
      { value: "25 kun", title: "Muddat shartnomada", text: "O‘lchovdan keyin 25 ish kunida tayyorlaymiz. Topshirish sanasi shartnomaga yoziladi." },
      { value: "70 filial", title: "Yetakchilar tanlovi", text: "Safia va Burger Embassy kabi tarmoqlar bizni bir marta emas, yillar davomida tanlaydi." },
      { value: "2 yil", title: "Kafolat", text: "Har bir buyurtmaga. Har bir qism jo‘natishdan oldin tekshiriladi." },
    ],
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
    title: "Buyurtma qanday o‘tadi",
    steps: [
      { title: "Maslahat", text: "Vazifa, byudjet va muddatni aniqlaymiz." },
      { title: "O‘lchov", text: "Uyingiz yoki obyektingizga kelib o‘lchaymiz." },
      { title: "3D loyiha", text: "Ko‘rinishi va narxi shartnomadan oldin tayyor." },
      { title: "Ishlab chiqarish", text: "25 ish kunida, Homag va CNC dastgohlarida." },
      { title: "Tekshiruv", text: "Har bir qism jo‘natishdan oldin tekshiriladi." },
      { title: "O‘rnatish", text: "Qadoqlab yetkazamiz, o‘z ustalarimiz o‘rnatadi." },
    ],
  },
  factory: {
    eyebrow: "Fabrika",
    title: "Kesishdan qadoqlashgacha: hammasi o‘zimizda",
    lead: "Shuning uchun muddat va sifat uchun boshqalarga emas, o‘zimizga javob beramiz.",
    img: "/img/stock/s-cnc.jpg",
    sites: [
      { value: "600 m²", label: "Izza: kesish sexi" },
      { value: "800 m²", label: "Yangiyo‘l: yig‘ish, bo‘yash, qadoqlash" },
    ],
    facts: [
      { title: "Homag", text: "Germaniya dastgohlari" },
      { title: "Nesting", text: "Plitani avtomatik kesish va teshish" },
      { title: "Bazis + CNC", text: "Loyiha to‘g‘ridan-to‘g‘ri dastgohga uzatiladi" },
      { title: "Sifat nazorati", text: "Har bir qism alohida tekshiriladi" },
    ],
  },
  quiz: {
    eyebrow: "Narxni hisoblash",
    title: "5 savol, 1 daqiqa",
    lead: "Menejer javoblaringiz asosida hisob-kitob tayyorlaydi va siz bilan bog‘lanadi.",
    perks: ["3D loyiha bepul", "Nostandart o‘lcham uchun ustama yo‘q", "Ariza sizni hech narsaga majburlamaydi"],
  },
  contact: {
    eyebrow: "Bog‘lanish",
    title: "Loyihangizni muhokama qilaylik",
    lead: "Interyeringiz qanday bo‘lishini bugun ko‘ring: o‘lchovchimiz keladi, 3D loyihani siz bilan birga tayyorlaymiz.",
    phoneLabel: "Telefon",
    officeLabel: "Ofis",
    address: "Toshkent, Olmazor tumani, Jomiy ko‘chasi, 5-uy",
  },
};

export type Home2 = typeof uz;

export const home2: Record<Locale, Home2> = { uz, ru: uz, en: uz };
