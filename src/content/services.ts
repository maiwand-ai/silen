import type { L } from "@/lib/i18n";
import { images } from "@/config/media";

/**
 * ─────────────────────────────────────────────────────────────
 *  SERVICES — edit text (English + Turkish) and images here.
 * ─────────────────────────────────────────────────────────────
 */

export type ServiceId =
  | "video"
  | "creative"
  | "social"
  | "growth"
  | "paid"
  | "fashion"
  | "community"
  | "strategy"
  | "web"
  | "visual";

export type Service = {
  id: ServiceId;
  /** Icon name from src/components/ui/Icon.tsx */
  icon: string;
  title: L;
  short: L;
  description: L;
  items: L[];
  image: string;
  imageAlt: L;
  /** Optional extra note, e.g. an honest limitation. */
  note?: L;
};

export const services: Service[] = [
  {
    id: "video",
    icon: "clapperboard",
    title: { en: "AI-Assisted Video Production", tr: "Yapay Zekâ Destekli Video Prodüksiyonu" },
    short: { en: "Scroll-stopping videos made for the way people watch today.", tr: "Bugünün izleme alışkanlıklarına uygun, akışı durduran videolar." },
    description: {
      en: "We combine creative direction with AI-assisted tools to turn your products, photos and ideas into promotional videos built for feeds, Reels and ads.",
      tr: "Yaratıcı yönetimi yapay zekâ destekli araçlarla birleştirerek ürünlerinizi, fotoğraflarınızı ve fikirlerinizi akışlara, Reels’lere ve reklamlara uygun tanıtım videolarına dönüştürüyoruz.",
    },
    items: [
      { en: "Promotional videos", tr: "Tanıtım videoları" },
      { en: "Product videos", tr: "Ürün videoları" },
      { en: "Fashion videos", tr: "Moda videoları" },
      { en: "Short-form videos", tr: "Kısa videolar" },
      { en: "Reels", tr: "Reels" },
      { en: "AI-assisted advertising concepts", tr: "Yapay zekâ destekli reklam konseptleri" },
    ],
    image: images.fashionStreet,
    imageAlt: { en: "Woman in a tartan coat walking down a city street", tr: "Şehir sokağında yürüyen ekose paltolu kadın" },
  },
  {
    id: "creative",
    icon: "sparkles",
    title: { en: "Advertising Creative", tr: "Reklam Kreatifi" },
    short: { en: "Ideas and visuals that give people a reason to stop.", tr: "İnsanlara durmak için bir sebep veren fikirler ve görseller." },
    description: {
      en: "From a single promotional graphic to a full seasonal campaign, we shape the message, the look and the format around your audience.",
      tr: "Tek bir tanıtım görselinden sezonluk bir kampanyaya kadar mesajı, görünümü ve formatı hedef kitlenize göre şekillendiriyoruz.",
    },
    items: [
      { en: "Video advertisements", tr: "Video reklamlar" },
      { en: "Promotional graphics", tr: "Tanıtım görselleri" },
      { en: "Seasonal campaigns", tr: "Sezonluk kampanyalar" },
      { en: "Product campaigns", tr: "Ürün kampanyaları" },
      { en: "Brand storytelling", tr: "Marka hikâyesi anlatımı" },
    ],
    image: images.fashionYellow,
    imageAlt: { en: "Model in a bright yellow tracksuit against a blue sky", tr: "Mavi gökyüzü önünde parlak sarı eşofmanlı model" },
  },
  {
    id: "social",
    icon: "layout-grid",
    title: { en: "Social Media Management", tr: "Sosyal Medya Yönetimi" },
    short: { en: "A consistent, on-brand presence without the daily stress.", tr: "Günlük stres olmadan tutarlı ve markanıza uygun bir varlık." },
    description: {
      en: "We plan, prepare and publish content across your accounts on an agreed schedule, so your profile always looks cared for.",
      tr: "Hesaplarınızdaki içerikleri kararlaştırılan takvime göre planlıyor, hazırlıyor ve paylaşıyoruz; profiliniz her zaman özenli görünür.",
    },
    items: [
      { en: "Instagram", tr: "Instagram" },
      { en: "TikTok", tr: "TikTok" },
      { en: "Facebook", tr: "Facebook" },
      { en: "Content planning", tr: "İçerik planlama" },
      { en: "Publishing", tr: "Paylaşım" },
      { en: "Reels and stories", tr: "Reels ve hikâyeler" },
      { en: "Account management", tr: "Hesap yönetimi" },
    ],
    image: images.fashionShopping,
    imageAlt: { en: "Stylish woman carrying shopping bags", tr: "Alışveriş poşetleri taşıyan şık kadın" },
  },
  {
    id: "growth",
    icon: "trending-up",
    title: { en: "Organic Social Media Growth", tr: "Organik Sosyal Medya Büyümesi" },
    short: { en: "Steady, organic visibility built on good content.", tr: "İyi içerik üzerine kurulu, istikrarlı ve organik görünürlük." },
    description: {
      en: "Organic growth means building an audience through strategy and consistent, relevant content — without paid promotion. It takes time, and results vary by business.",
      tr: "Organik büyüme; ücretli tanıtım olmadan, strateji ve düzenli, ilgi çekici içerikle kitle oluşturmaktır. Zaman alır ve sonuçlar işletmeye göre değişir.",
    },
    items: [
      { en: "Content strategy", tr: "İçerik stratejisi" },
      { en: "Organic audience development", tr: "Organik kitle geliştirme" },
      { en: "Engagement improvement", tr: "Etkileşimi artırmaya yönelik çalışmalar" },
      { en: "Consistent publishing", tr: "Düzenli paylaşım" },
      { en: "Brand visibility", tr: "Marka görünürlüğü" },
    ],
    note: {
      en: "Organic growth is separate from paid advertising. We never guarantee followers, viral reach or sales.",
      tr: "Organik büyüme, ücretli reklamdan ayrıdır. Takipçi, viral erişim veya satış garantisi vermeyiz.",
    },
    image: images.fashionStudioGreen,
    imageAlt: { en: "Model posing in striped trousers against a green wall", tr: "Yeşil duvar önünde çizgili pantolonla poz veren model" },
  },
  {
    id: "paid",
    icon: "target",
    title: { en: "Paid Digital Advertising", tr: "Ücretli Dijital Reklam" },
    short: { en: "Campaigns planned, launched and watched carefully.", tr: "Özenle planlanan, yayınlanan ve takip edilen kampanyalar." },
    description: {
      en: "We plan and manage paid campaigns on the platforms where your customers spend time, and report clearly on how they perform.",
      tr: "Müşterilerinizin vakit geçirdiği platformlarda ücretli kampanyalar planlıyor, yönetiyor ve performanslarını açıkça raporluyoruz.",
    },
    items: [
      { en: "Campaign planning", tr: "Kampanya planlama" },
      { en: "Advertising creative", tr: "Reklam kreatifi" },
      { en: "Audience targeting", tr: "Hedef kitle belirleme" },
      { en: "Campaign management", tr: "Kampanya yönetimi" },
      { en: "Performance monitoring", tr: "Performans takibi" },
      { en: "Reporting", tr: "Raporlama" },
    ],
    note: {
      en: "Advertising spend is paid separately unless your written proposal includes it. Sevil is an independent service and is not an official partner of any advertising platform.",
      tr: "Yazılı teklifte yer almadıkça reklam bütçesi ayrıca ödenir. Sevil bağımsız bir hizmettir; herhangi bir reklam platformunun resmî iş ortağı değildir.",
    },
    image: images.ecommerceCheckout,
    imageAlt: { en: "Person paying online with a card at a laptop", tr: "Dizüstü bilgisayarda kartla çevrim içi ödeme yapan kişi" },
  },
  {
    id: "fashion",
    icon: "shirt",
    title: { en: "Fashion & Product Advertising", tr: "Moda ve Ürün Reklamcılığı" },
    short: { en: "Your collection, presented like a campaign.", tr: "Koleksiyonunuz, bir kampanya gibi sunulsun." },
    description: {
      en: "Built for boutiques and product brands: campaign visuals, launch content and AI-assisted model concepts based on your own product photos.",
      tr: "Butikler ve ürün markaları için: kendi ürün fotoğraflarınızdan kampanya görselleri, lansman içerikleri ve yapay zekâ destekli model konseptleri.",
    },
    items: [
      { en: "Fashion campaigns", tr: "Moda kampanyaları" },
      { en: "Boutique promotions", tr: "Butik tanıtımları" },
      { en: "Product showcases", tr: "Ürün vitrinleri" },
      { en: "AI-assisted model concepts", tr: "Yapay zekâ destekli model konseptleri" },
      { en: "New collection launches", tr: "Yeni koleksiyon lansmanları" },
      { en: "Seasonal promotions", tr: "Sezonluk promosyonlar" },
    ],
    image: images.fashionCityCoat,
    imageAlt: { en: "Woman in a pale blue coat in front of a cathedral", tr: "Katedral önünde açık mavi paltolu kadın" },
  },
  {
    id: "community",
    icon: "messages",
    title: { en: "Community Management", tr: "Topluluk Yönetimi" },
    short: { en: "Every comment and message handled with care.", tr: "Her yorum ve mesaj özenle yanıtlanır." },
    description: {
      en: "We look after the conversations around your brand, answer routine questions and pass anything important straight to you.",
      tr: "Markanız etrafındaki konuşmaları takip ediyor, sık sorulan soruları yanıtlıyor ve önemli konuları doğrudan size iletiyoruz.",
    },
    items: [
      { en: "Comment moderation", tr: "Yorum moderasyonu" },
      { en: "Direct-message handling", tr: "Direkt mesaj yönetimi" },
      { en: "Customer inquiry management", tr: "Müşteri sorularının yönetimi" },
      { en: "Response templates", tr: "Yanıt şablonları" },
      { en: "Escalation of important issues", tr: "Önemli konuların size iletilmesi" },
    ],
    image: images.localBusiness,
    imageAlt: { en: "Shop staff helping a customer at a tablet", tr: "Tablet başında müşteriye yardım eden mağaza çalışanı" },
  },
  {
    id: "strategy",
    icon: "calendar",
    title: { en: "Content Strategy & Reporting", tr: "İçerik Stratejisi ve Raporlama" },
    short: { en: "A clear plan, and honest numbers on how it is going.", tr: "Net bir plan ve gidişata dair dürüst veriler." },
    description: {
      en: "Content calendars that keep you consistent, plus monthly reports that explain reach and engagement in plain language.",
      tr: "Sizi düzenli tutan içerik takvimleri ve erişim ile etkileşimi sade bir dille açıklayan aylık raporlar.",
    },
    items: [
      { en: "Content calendars", tr: "İçerik takvimleri" },
      { en: "Monthly reports", tr: "Aylık raporlar" },
      { en: "Reach and engagement analysis", tr: "Erişim ve etkileşim analizi" },
      { en: "Recommendations", tr: "Öneriler" },
    ],
    image: images.productFlatlay,
    imageAlt: { en: "Neatly arranged clothing flat lay", tr: "Düzenli yerleştirilmiş kıyafet kompozisyonu" },
  },
  {
    id: "web",
    icon: "monitor",
    title: { en: "Websites & Landing Pages", tr: "Web Siteleri ve Açılış Sayfaları" },
    short: { en: "A home for your brand that turns visits into enquiries.", tr: "Ziyaretleri taleplere dönüştüren bir marka evi." },
    description: {
      en: "Fast, mobile-friendly pages for your business, a product launch or a single campaign — designed to match your content.",
      tr: "İşletmeniz, bir ürün lansmanı ya da tek bir kampanya için hızlı, mobil uyumlu ve içeriklerinizle uyumlu sayfalar.",
    },
    items: [
      { en: "Business websites", tr: "Kurumsal web siteleri" },
      { en: "Promotional landing pages", tr: "Tanıtım açılış sayfaları" },
      { en: "Campaign pages", tr: "Kampanya sayfaları" },
      { en: "Contact pages", tr: "İletişim sayfaları" },
    ],
    image: images.boutiqueInterior,
    imageAlt: { en: "Bright, minimal boutique interior", tr: "Aydınlık ve sade bir butik iç mekânı" },
  },
  {
    id: "visual",
    icon: "wand",
    title: { en: "Product Visual Enhancement", tr: "Ürün Görseli İyileştirme" },
    short: { en: "Simple product photos, presented at their best.", tr: "Sade ürün fotoğrafları, en iyi hâliyle." },
    description: {
      en: "We improve how your existing product photos are presented — composition, colour, background and layout — and turn them into campaign-ready graphics.",
      tr: "Mevcut ürün fotoğraflarınızın sunumunu; kompozisyon, renk, arka plan ve yerleşim açısından iyileştirip kampanyaya hazır görsellere dönüştürüyoruz.",
    },
    items: [
      { en: "Product image presentation", tr: "Ürün görseli sunumu" },
      { en: "Advertising compositions", tr: "Reklam kompozisyonları" },
      { en: "Promotional graphics", tr: "Tanıtım görselleri" },
      { en: "Campaign concepts", tr: "Kampanya konseptleri" },
    ],
    image: images.beautySerum,
    imageAlt: { en: "Amber serum bottle on a wooden stand in soft light", tr: "Yumuşak ışıkta ahşap stand üzerinde kehribar serum şişesi" },
  },
];

export const serviceById = (id: string) => services.find((s) => s.id === id);
