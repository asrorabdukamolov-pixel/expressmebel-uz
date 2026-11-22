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
    title: "Har bir mijoz uchun o‘z yondashuvimiz bor",
    items: [
      { id: "home", label: "Uyingiz uchun", title: "Mehmonlaringiz so‘raydi: qayerdan buyurtma qildingiz?", text: "Bunday mebel boshqa hech kimda yo‘q, chunki u sizning xonangiz va odatlaringiz uchun chizilgan. Qanday bo‘lishini 3D loyihada oldindan ko‘rasiz, o‘rnatilgandan keyin 2 yil kafolat beramiz.", img: "/img/projects/p-dining.jpg" },
      { id: "horeca", label: "Restoran va kafelar", title: "Har kuni yuzlab mijozga xizmat qiladigan sifatli mebel", text: "Mehmon brendingizni birinchi bo‘lib interyer orqali his qiladi. Safia’ning 70 filiali va Burger Embassy’ning 10 dan ortiq restorani mebelini biz yasaganmiz, har bir filialda sifat bir xil.", img: "/img/safia-2.jpg" },
      { id: "build", label: "Biznes va quruvchilar", title: "Mebel qurilish grafigingizdan orqada qolmaydi", text: "Uylarni topshirish sanasi yaqinlashganda mebel kechikmasligi kerak. Ishlab chiqarishni grafigingizga moslaymiz, ko‘p xonadonli buyurtmani bosqichma-bosqich, o‘z vaqtida yetkazamiz.", img: "/img/works/495-1.jpg" },
      { id: "design", label: "Dizaynerlar", title: "Loyihangiz aynan siz chizgandek bo‘ladi", text: "Mijozingiz natijani ko‘rganda sizning ishingizni tan oladi. Chizmangizni millimetrigacha bajaramiz, 3 000 dan ortiq RAL va NCS rang ichidan aynan kerakli tusni topamiz.", img: "/img/editorial/e-table.jpg" },
    ] as { id: "home" | SegmentId; label: string; title: string; text: string; img: string }[],
    go: "Ariza qoldirish",
  },
  dream: {
    eyebrow: "Orzudan haqiqatga",
    title: "G‘oyangiz qanday qilib mebelga aylanadi",
    lead: "Chiziqni suring: chapda g‘oya, o‘ngda tayyor oshxona. Siz ham avval o‘z oshxonangizni 3D loyihada ko‘rasiz, keyin xuddi shu oshxona uyingizda turadi.",
    points: ["3D loyiha bepul", "Rang va materialni loyihada o‘zingiz tanlaysiz", "Tayyor mebel loyihadagidek bo‘ladi"],
    img: "/img/projects/p-kitchen.jpg",
    dreamLabel: "Orzu",
    realLabel: "Haqiqat",
    hint: "Suring: orzudan haqiqatga",
  },
  catalog: {
    eyebrow: "Katalog",
    title: "Nimalar yasaymiz",
    lead: "Har bir buyum tayyor katalogdan olinmaydi, sizning xonangiz o‘lchamiga qarab chiziladi. Nostandart o‘lcham uchun qo‘shimcha haq olmaymiz.",
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
    text: "Bu uyning oshxonasidan yotoqxonasigacha hammasini bitta jamoa loyihaladi, o‘z fabrikamizda yasadi va o‘rnatdi. Uy egasi faqat tayyor natijani qabul qilib oldi.",
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
    title: "Yetakchi tarmoqlar bizga yillar davomida ishonadi",
    items: [
      {
        name: "Safia",
        logo: "/brand/clients/safia-logo.jpg",
        img: "/img/safia-1.jpg",
        text: "70 ta filial uchun vitrina, peshtaxta va mebel yasadik, 40 dan ortiq filialda eski mebelni yangiladik.",
        stats: [{ value: "70", label: "filial" }, { value: "1,5 yil", label: "hamkorlik" }],
      },
      {
        name: "Burger Embassy",
        logo: "/brand/clients/burger-embassy-logo.jpg",
        img: "/img/cases/embassy.jpg",
        text: "Bir yildan beri tarmoq bilan birga ishlaymiz, 10 dan ortiq restoranni to‘liq jihozladik.",
        stats: [{ value: "10+", label: "restoran" }, { value: "1 yil", label: "hamkorlik" }],
      },
    ],
  },
  benefits: {
    eyebrow: "Nega Express Mebel",
    title: "Nega bizni tanlashadi",
    img: "/img/editorial/e-shelf.jpg",
    items: [
      { value: "1 400 m²", title: "O‘z fabrikamiz", text: "Kesishdan qadoqlashgacha hamma ish o‘zimizda bo‘ladi. Shuning uchun muddat va sifat uchun boshqalarga emas, o‘zimizga javob beramiz." },
      { value: "Bepul", title: "3D loyiha", text: "Mebel xonangizda qanday turishini va narxini bir so‘m to‘lamasdan oldin ko‘rasiz." },
      { value: "25 kun", title: "Muddat shartnomada", text: "O‘lchovdan keyin 25 ish kunida tayyorlaymiz. Topshirish sanasi shartnomaga yoziladi, siz rejangizni bemalol tuzasiz." },
      { value: "70 filial", title: "Yetakchilar tanlovi", text: "Safia va Burger Embassy kabi tarmoqlar bizni bir marta emas, yillar davomida tanlab keladi." },
      { value: "2 yil", title: "Kafolat", text: "Har bir qism jo‘natishdan oldin tekshiriladi. O‘rnatilgandan keyin ham mebelingiz 2 yil bizning kafolatimizda bo‘ladi." },
    ],
  },
  videos: {
    eyebrow: "Video",
    title: "O‘z ko‘zingiz bilan ko‘ring",
    lead: "Fabrikamiz, ish jarayonimiz va asoschimiz haqida qisqa videolar.",
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
      { title: "Maslahat", text: "Nima kerakligini, byudjet va muddatni birga aniqlaymiz." },
      { title: "O‘lchov", text: "O‘lchovchimiz uyingiz yoki obyektingizga kelib aniq o‘lchaydi." },
      { title: "3D loyiha", text: "Mebel ko‘rinishi va narxini shartnomadan oldin ko‘rasiz." },
      { title: "Ishlab chiqarish", text: "25 ish kunida, Homag va CNC dastgohlarida yasaymiz." },
      { title: "Tekshiruv", text: "Har bir qism jo‘natishdan oldin alohida tekshiriladi." },
      { title: "O‘rnatish", text: "Qadoqlab yetkazamiz, o‘z ustalarimiz joyiga o‘rnatadi." },
    ],
  },
  factory: {
    eyebrow: "Fabrika",
    title: "Kesishdan qadoqlashgacha hamma ish o‘zimizda",
    lead: "Shuning uchun mebelingiz qachon tayyor bo‘lishini aniq aytamiz, bu va’da boshqa birovga bog‘liq bo‘lmaydi.",
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
    lead: "Javoblaringiz asosida menejerimiz hisob-kitob tayyorlab, siz bilan bog‘lanadi.",
    perks: ["3D loyiha bepul", "Nostandart o‘lcham uchun ustama yo‘q", "Ariza sizni hech narsaga majburlamaydi"],
  },
  contact: {
    eyebrow: "Bog‘lanish",
    title: "Loyihangizni muhokama qilaylik",
    lead: "O‘lchovchimiz keladi, 3D loyihani siz bilan birga tayyorlaymiz va mebelingiz qanday bo‘lishini shartnomadan oldin ko‘rasiz.",
    phoneLabel: "Telefon",
    officeLabel: "Ofis",
    address: "Toshkent, Olmazor tumani, Jomiy ko‘chasi, 5-uy",
  },
};

export type Home2 = typeof uz;

export const home2: Record<Locale, Home2> = { uz, ru: uz, en: uz };
