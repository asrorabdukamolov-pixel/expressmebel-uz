import type { Locale } from "./config";

/** Yangi tuzilma (2026-11-25, Asror aka: mossman.ru uslubida): menyu, alohida sahifalar, pastki blok.
 *  Fakt: 2013-yilda tashkil topgan, 3 000 dan ortiq loyiha (egasi, 2026-11-25). */
const uz = {
  menu: {
    catalog: "Katalog",
    projects: "Loyihalar",
    about: "Biz haqimizda",
    office: "Ofis",
    open: "Menyuni ochish",
    close: "Menyuni yopish",
    cta: "Narxini hisoblash",
  },
  cta: {
    text: "Loyihangizni muhokama qilaylik. O‘lchovchimiz keladi, mebel va narxini shartnomadan oldin siz bilan birga kelishib olamiz.",
    button: "Ariza qoldirish",
    ring: "Oshxonalar · Garderoblar · Yotoqxonalar · Mehmonxonalar · ",
  },
  home: {
    catalogTitle: "Katalog",
    catalogAll: "Butun katalog",
    valuesTitle: "Mebelga yondashuvimiz",
    videosTitle: "Kompaniya haqida video",
    factoryCap: "Fabrikamiz: kesishdan qadoqlashgacha hamma ish o‘zimizda",
  },
  catalog: {
    title: "Katalog",
    lead: "Har bir buyum tayyor katalogdan olinmaydi, xonangiz o‘lchamiga qarab chiziladi. Turini tanlang va shu turdagi ishlarimizni ko‘ring.",
    more: "Barcha loyihalar",
  },
  projects: {
    title: "Loyihalar",
    lead: "Bu yerda fabrikamizda yasalib, mijozlarimiz uyiga o‘rnatilgan haqiqiy ishlar. Ixcham oshxonadan butun uy mebeligacha, har birining ortida o‘z egasi va o‘z vazifasi bor.",
  },
  about: {
    title: "Biz haqimizda",
    founded: { value: "2013", label: "Express Mebel tashkil topgan yil" },
    stats: [
      { value: "3 000+", label: "bajarilgan loyiha" },
      { value: "1 400 m²", label: "o‘z fabrikamiz maydoni" },
      { value: "25 kun", label: "o‘rtacha tayyorlash muddati" },
      { value: "70", label: "Safia filiali uchun mebel yasadik" },
    ],
    processTitle: "Mebel qanday yasaladi",
    processLead: "Buyurtma mebeli ketma-ket bosqichlardan o‘tadi va har birida aniqlik muhim. Shuning uchun ishni g‘oyadan tayyor mebelgacha bitta jamoa olib boradi.",
    note: "Loyihalashdan o‘rnatishgacha har bir bosqichda Express Mebel mutaxassislari ishtirok etadi va sifatni tekshiradi. Shuning uchun tayyor mebel kelishilgan loyihaga aynan mos keladi.",
    clientsTitle: "Bizga ishonadigan tarmoqlar",
  },
  office: {
    title: "Ofis",
    lead: "Ofisimizga keling: namunalarni ko‘rasiz, rang va materialni qo‘lda ushlab tanlaysiz.",
    map: "Xaritada ochish",
    social: "Instagram va Telegram",
    formTitle: "Ariza qoldiring",
  },
  footer: { menu: "Sahifalar", social: "Ijtimoiy tarmoqlar", phone: "Telefon" },
};

export type Pages = typeof uz;

const ru: Pages = {
  menu: {
    catalog: "Каталог",
    projects: "Проекты",
    about: "О компании",
    office: "Офис",
    open: "Открыть меню",
    close: "Закрыть меню",
    cta: "Рассчитать стоимость",
  },
  cta: {
    text: "Давайте обсудим ваш проект. Замерщик приедет к вам, а мебель и цену мы согласуем вместе с вами до договора.",
    button: "Оставить заявку",
    ring: "Кухни · Гардеробные · Спальни · Гостиные · ",
  },
  home: {
    catalogTitle: "Каталог",
    catalogAll: "Весь каталог",
    valuesTitle: "Наш подход к мебели",
    videosTitle: "Видео о компании",
    factoryCap: "Наша фабрика: всё, от раскроя до упаковки, делаем сами",
  },
  catalog: {
    title: "Каталог",
    lead: "Мы не берём мебель из готового каталога: каждое изделие проектируется под размеры вашей комнаты. Выберите тип и посмотрите наши работы.",
    more: "Все проекты",
  },
  projects: {
    title: "Проекты",
    lead: "Здесь собраны реальные работы, изготовленные на нашей фабрике и установленные у наших клиентов. От компактных кухонь до мебели для всего дома, и за каждой стоят реальные люди и их задачи.",
  },
  about: {
    title: "О компании",
    founded: { value: "2013", label: "год основания Express Mebel" },
    stats: [
      { value: "3 000+", label: "выполненных проектов" },
      { value: "1 400 м²", label: "площадь собственной фабрики" },
      { value: "25 дней", label: "средний срок изготовления" },
      { value: "70", label: "филиалов Safia с нашей мебелью" },
    ],
    processTitle: "Как создаётся мебель",
    processLead: "Мебель на заказ проходит последовательные этапы, и на каждом важна точность. Поэтому от идеи до готового изделия работу ведёт одна команда.",
    note: "На каждом этапе, от проектирования до монтажа, работают специалисты Express Mebel и проверяют качество. Поэтому готовая мебель точно соответствует согласованному проекту.",
    clientsTitle: "Сети, которые нам доверяют",
  },
  office: {
    title: "Офис",
    lead: "Приезжайте в наш офис: посмотрите образцы и выберите цвет и материал вживую.",
    map: "Открыть на карте",
    social: "Instagram и Telegram",
    formTitle: "Оставьте заявку",
  },
  footer: { menu: "Страницы", social: "Соцсети", phone: "Телефон" },
};

const en: Pages = {
  menu: {
    catalog: "Catalog",
    projects: "Projects",
    about: "About us",
    office: "Office",
    open: "Open menu",
    close: "Close menu",
    cta: "Get a price",
  },
  cta: {
    text: "Let’s discuss your project. Our specialist will come to measure, and we agree on the furniture and price together with you before the contract.",
    button: "Send a request",
    ring: "Kitchens · Wardrobes · Bedrooms · Living rooms · ",
  },
  home: {
    catalogTitle: "Catalog",
    catalogAll: "Full catalog",
    valuesTitle: "Our approach to furniture",
    videosTitle: "About the company on video",
    factoryCap: "Our factory: everything from cutting to packing, in-house",
  },
  catalog: {
    title: "Catalog",
    lead: "Nothing comes from an off-the-shelf catalogue: every piece is designed to the size of your room. Choose a type to see our work.",
    more: "All projects",
  },
  projects: {
    title: "Projects",
    lead: "Real work made in our factory and installed in our clients’ homes. From compact kitchens to furniture for the whole home, each with real people and their own needs behind it.",
  },
  about: {
    title: "About us",
    founded: { value: "2013", label: "the year Express Mebel was founded" },
    stats: [
      { value: "3,000+", label: "projects completed" },
      { value: "1,400 m²", label: "our own factory" },
      { value: "25 days", label: "average production time" },
      { value: "70", label: "Safia branches furnished by us" },
    ],
    processTitle: "How our furniture is made",
    processLead: "Custom furniture goes through a sequence of stages, and precision matters at each one. That is why one team leads the work from idea to finished piece.",
    note: "Express Mebel specialists take part in every stage, from design to installation, and check the quality. So the finished furniture matches the agreed design exactly.",
    clientsTitle: "Chains that trust us",
  },
  office: {
    title: "Office",
    lead: "Visit our office: see the samples and choose colours and materials in person.",
    map: "Open in maps",
    social: "Instagram and Telegram",
    formTitle: "Send a request",
  },
  footer: { menu: "Pages", social: "Social", phone: "Phone" },
};

export const pages: Record<Locale, Pages> = { uz, ru, en };

/** Ofis manzili xarita uchun (aniq nuqtani egasi tasdiqlashi kerak). */
export const officeQuery = "Toshkent, Olmazor tumani, Jomiy ko‘chasi 5";
