import type { L } from "@/lib/i18n";
import { images, videos } from "@/config/media";

/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO — add, remove or reorder projects here.
 * ─────────────────────────────────────────────────────────────
 *  video:
 *    { type: "file", src: "/videos/my-video.mp4" }   ← file in /public/videos
 *    { type: "file", src: "https://cdn.example.com/a.mp4" }
 *    { type: "youtube", id: "VIDEO_ID" }
 *    { type: "vimeo", id: "123456789" }
 *    omit `video` for a still visual (shown as an image, never as a video)
 *
 *  isConcept: true  → labelled "Concept Project" / "Konsept Çalışma".
 *  Only set it to false for real, approved client work.
 * ─────────────────────────────────────────────────────────────
 */

export type PortfolioCategory = "video" | "fashion" | "product" | "social" | "branding" | "campaign";

export type VideoSource =
  | { type: "file"; src: string }
  | { type: "youtube"; id: string }
  | { type: "vimeo"; id: string };

export type PortfolioItem = {
  id: string;
  title: L;
  description: L;
  categories: PortfolioCategory[];
  thumbnail: string;
  thumbnailAlt: L;
  video?: VideoSource;
  /** "portrait" for 9:16 Reels, "landscape" for 16:9 films. */
  orientation?: "portrait" | "landscape";
  industry?: string;
  projectType: L;
  isConcept: boolean;
  /** Short words printed over the thumbnail like ad artwork. */
  overlay?: L;
};

export const portfolioCategories: { id: "all" | PortfolioCategory; label: L }[] = [
  { id: "all", label: { en: "All Work", tr: "Tümü" } },
  { id: "video", label: { en: "Video Ads", tr: "Reklam Videoları" } },
  { id: "fashion", label: { en: "Fashion", tr: "Moda" } },
  { id: "product", label: { en: "Product Ads", tr: "Ürün Reklamları" } },
  { id: "social", label: { en: "Social Media", tr: "Sosyal Medya" } },
  { id: "branding", label: { en: "Branding", tr: "Marka Tasarımı" } },
  { id: "campaign", label: { en: "Promotional Campaigns", tr: "Tanıtım Kampanyaları" } },
];

export const portfolio: PortfolioItem[] = [
  {
    id: "red-season-reel",
    title: { en: "Red Season — Fashion Reel", tr: "Kırmızı Sezon — Moda Reels" },
    description: {
      en: "A vertical fashion reel concept with slow, editorial camera movement across four looks.",
      tr: "Dört kombin üzerinde yavaş, editoryal kamera hareketleriyle kurgulanmış dikey moda Reels konsepti.",
    },
    categories: ["video", "fashion", "social"],
    thumbnail: images.fashionRedDress,
    thumbnailAlt: { en: "Woman twirling in a long red dress", tr: "Uzun kırmızı elbisesiyle dönen kadın" },
    video: { type: "file", src: videos.fashionReel },
    orientation: "portrait",
    industry: "fashion",
    projectType: { en: "Reel · 13 s", tr: "Reels · 13 sn" },
    isConcept: true,
    overlay: { en: "New Season", tr: "Yeni Sezon" },
  },
  {
    id: "boutique-collection-film",
    title: { en: "Collection Launch Film", tr: "Koleksiyon Lansman Filmi" },
    description: {
      en: "A widescreen launch film concept for a boutique’s new arrivals, ready for website headers and ads.",
      tr: "Bir butiğin yeni ürünleri için web sitesi ve reklamlarda kullanılabilecek yatay lansman filmi konsepti.",
    },
    categories: ["video", "fashion", "campaign"],
    thumbnail: images.boutiqueInterior,
    thumbnailAlt: { en: "Clothing rails in a bright boutique", tr: "Aydınlık bir butikte kıyafet askıları" },
    video: { type: "file", src: videos.boutiqueCollection },
    orientation: "landscape",
    industry: "fashion",
    projectType: { en: "Launch film · 13 s", tr: "Lansman filmi · 13 sn" },
    isConcept: true,
    overlay: { en: "Just Arrived", tr: "Yeni Geldi" },
  },
  {
    id: "glow-ritual-reel",
    title: { en: "Glow Ritual — Skincare Reel", tr: "Işıltı Ritüeli — Cilt Bakımı Reels" },
    description: {
      en: "Soft-light product moments for a skincare brand, cut for Reels and Stories.",
      tr: "Bir cilt bakımı markası için yumuşak ışıklı ürün anları; Reels ve hikâyeler için kurgulandı.",
    },
    categories: ["video", "social", "product"],
    thumbnail: images.beautySerum,
    thumbnailAlt: { en: "Serum bottle on a wooden stand", tr: "Ahşap stand üzerinde serum şişesi" },
    video: { type: "file", src: videos.beautyReel },
    orientation: "portrait",
    industry: "beauty",
    projectType: { en: "Reel · 10 s", tr: "Reels · 10 sn" },
    isConcept: true,
    overlay: { en: "Glow Ritual", tr: "Işıltı Ritüeli" },
  },
  {
    id: "morning-brew-reel",
    title: { en: "Morning Brew — Café Reel", tr: "Sabah Kahvesi — Kafe Reels" },
    description: {
      en: "A warm café reel concept that moves from coffee to kitchen — made to make people hungry.",
      tr: "Kahveden mutfağa uzanan, iştah açan sıcak bir kafe Reels konsepti.",
    },
    categories: ["video", "social"],
    thumbnail: images.foodCoffee,
    thumbnailAlt: { en: "Hands holding latte art coffees", tr: "Latte art kahveleri tutan eller" },
    video: { type: "file", src: videos.restaurantReel },
    orientation: "portrait",
    industry: "restaurant",
    projectType: { en: "Reel · 10 s", tr: "Reels · 10 sn" },
    isConcept: true,
    overlay: { en: "Fresh Daily", tr: "Her Gün Taze" },
  },
  {
    id: "product-spotlight",
    title: { en: "Product Spotlight Ad", tr: "Ürün Vitrini Reklamı" },
    description: {
      en: "A clean widescreen product ad concept for e-commerce stores, with bold colour and simple motion.",
      tr: "E-ticaret mağazaları için güçlü renkler ve sade hareketlerle hazırlanmış yatay ürün reklamı konsepti.",
    },
    categories: ["video", "product", "campaign"],
    thumbnail: images.productHeadphones,
    thumbnailAlt: { en: "Black headphones on a yellow background", tr: "Sarı zemin üzerinde siyah kulaklık" },
    video: { type: "file", src: videos.productAd },
    orientation: "landscape",
    industry: "ecommerce",
    projectType: { en: "Video ad · 10 s", tr: "Video reklam · 10 sn" },
    isConcept: true,
    overlay: { en: "Hear More", tr: "Daha Fazlasını Duy" },
  },
  {
    id: "knitwear-carousel",
    title: { en: "New In: Knitwear", tr: "Yeni Gelenler: Triko" },
    description: {
      en: "A social carousel concept introducing a knitwear capsule in warm, neutral tones.",
      tr: "Sıcak ve nötr tonlarda bir triko koleksiyonunu tanıtan sosyal medya kaydırmalı gönderi konsepti.",
    },
    categories: ["social", "fashion"],
    thumbnail: images.boutiqueKnitwear,
    thumbnailAlt: { en: "Knitwear hanging on a wooden rail", tr: "Ahşap askıda asılı triko ürünler" },
    industry: "fashion",
    projectType: { en: "Carousel post", tr: "Kaydırmalı gönderi" },
    isConcept: true,
    overlay: { en: "Soft Layers", tr: "Yumuşak Katmanlar" },
  },
  {
    id: "romper-campaign",
    title: { en: "From Product Photo to Campaign", tr: "Ürün Fotoğrafından Kampanyaya" },
    description: {
      en: "A simple product photo reworked into a campaign layout for feed and story formats.",
      tr: "Sade bir ürün fotoğrafının gönderi ve hikâye formatları için kampanya düzenine dönüştürülmesi.",
    },
    categories: ["product", "fashion", "campaign"],
    thumbnail: images.productRomper,
    thumbnailAlt: { en: "Olive green romper on a hanger", tr: "Askıda haki yeşil tulum" },
    industry: "fashion",
    projectType: { en: "Campaign visual", tr: "Kampanya görseli" },
    isConcept: true,
    overlay: { en: "Summer Edit", tr: "Yaz Seçkisi" },
  },
  {
    id: "timepiece",
    title: { en: "Minimal Timepiece Visual", tr: "Minimal Saat Görseli" },
    description: {
      en: "Product visual concept with generous negative space for an online store banner.",
      tr: "Bir çevrim içi mağaza afişi için geniş boşluklu ürün görseli konsepti.",
    },
    categories: ["product"],
    thumbnail: images.productWatch,
    thumbnailAlt: { en: "White smartwatch on a light background", tr: "Açık zemin üzerinde beyaz akıllı saat" },
    industry: "ecommerce",
    projectType: { en: "Web banner", tr: "Web afişi" },
    isConcept: true,
    overlay: { en: "Time, Simplified", tr: "Zamanın Sade Hâli" },
  },
  {
    id: "weekend-special",
    title: { en: "Weekend Special Promotion", tr: "Hafta Sonu Özel Kampanyası" },
    description: {
      en: "A promotional post concept for a pizzeria’s weekend offer — the offer details are left for the restaurant to set.",
      tr: "Bir pizzacının hafta sonu fırsatı için tanıtım gönderisi konsepti — kampanya detaylarını restoran belirler.",
    },
    categories: ["campaign", "social"],
    thumbnail: images.foodPizzaBoard,
    thumbnailAlt: { en: "Sliced pizza on a wooden board", tr: "Ahşap tahta üzerinde dilimlenmiş pizza" },
    industry: "restaurant",
    projectType: { en: "Promotional post", tr: "Tanıtım gönderisi" },
    isConcept: true,
    overlay: { en: "Weekend Special", tr: "Hafta Sonu Özel" },
  },
  {
    id: "personal-brand-kit",
    title: { en: "Personal Brand Visual Kit", tr: "Kişisel Marka Görsel Kiti" },
    description: {
      en: "A visual direction concept for a creator: colour, type and photo style that work together.",
      tr: "Bir içerik üreticisi için uyumlu renk, yazı karakteri ve fotoğraf stilinden oluşan görsel yön konsepti.",
    },
    categories: ["branding"],
    thumbnail: images.personalBrand,
    thumbnailAlt: { en: "Man sitting in front of a round window", tr: "Yuvarlak bir pencerenin önünde oturan adam" },
    industry: "personal",
    projectType: { en: "Brand direction", tr: "Marka yönü" },
    isConcept: true,
    overlay: { en: "Be Remembered", tr: "Akılda Kalın" },
  },
  {
    id: "salon-campaign",
    title: { en: "Beauty Salon Campaign", tr: "Güzellik Salonu Kampanyası" },
    description: {
      en: "Calm, premium visuals and messaging for a beauty salon’s treatment menu.",
      tr: "Bir güzellik salonunun bakım menüsü için sakin ve premium görseller ile mesajlar.",
    },
    categories: ["campaign", "branding"],
    thumbnail: images.beautyFacial,
    thumbnailAlt: { en: "Client receiving a facial treatment", tr: "Yüz bakımı yaptıran müşteri" },
    industry: "beauty",
    projectType: { en: "Campaign set", tr: "Kampanya seti" },
    isConcept: true,
    overlay: { en: "Time for You", tr: "Kendinize Zaman Ayırın" },
  },
  {
    id: "season-sale",
    title: { en: "Seasonal Sale for E-commerce", tr: "E-ticaret İçin Sezon İndirimi" },
    description: {
      en: "Bold, graphic campaign artwork concept for a seasonal online sale.",
      tr: "Sezonluk bir çevrim içi indirim için güçlü, grafik ağırlıklı kampanya görseli konsepti.",
    },
    categories: ["campaign", "product"],
    thumbnail: images.ecommerceBags,
    thumbnailAlt: { en: "Red and black shopping bags", tr: "Kırmızı ve siyah alışveriş poşetleri" },
    industry: "ecommerce",
    projectType: { en: "Campaign artwork", tr: "Kampanya görseli" },
    isConcept: true,
    overlay: { en: "Season Sale", tr: "Sezon İndirimi" },
  },
];
