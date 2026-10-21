import type { L } from "@/lib/i18n";
import { images, videos } from "@/config/media";
import type { ServiceId } from "./services";

/**
 * ─────────────────────────────────────────────────────────────
 *  "SEE THE POSSIBILITIES" — industry showcase concepts
 * ─────────────────────────────────────────────────────────────
 *  Each concept is a demonstration built from stock photography.
 *  Add `video` only when a real video file exists for the concept.
 * ─────────────────────────────────────────────────────────────
 */

export type ConceptFormat = "reel" | "post" | "story" | "video" | "model" | "offer" | "banner" | "menu";

export type ShowcaseConcept = {
  format: ConceptFormat;
  image: string;
  alt: L;
  overlay: L;
  caption: L;
  video?: string;
};

export type ShowcaseIndustry = {
  id: string;
  label: L;
  intro: L;
  services: ServiceId[];
  concepts: ShowcaseConcept[];
};

export const conceptFormatLabels: Record<ConceptFormat, L> = {
  reel: { en: "Reel cover", tr: "Reels kapağı" },
  post: { en: "Feed post", tr: "Akış gönderisi" },
  story: { en: "Story", tr: "Hikâye" },
  video: { en: "Video ad preview", tr: "Video reklam önizlemesi" },
  model: { en: "AI-assisted model concept", tr: "Yapay zekâ destekli model konsepti" },
  offer: { en: "Special offer", tr: "Özel fırsat" },
  banner: { en: "Web banner", tr: "Web afişi" },
  menu: { en: "Menu promotion", tr: "Menü tanıtımı" },
};

export const showcaseIndustries: ShowcaseIndustry[] = [
  {
    id: "fashion",
    label: { en: "Fashion & Boutiques", tr: "Moda ve Butikler" },
    intro: {
      en: "Campaign imagery, Reels covers and launch videos that make a new collection feel like an event.",
      tr: "Yeni bir koleksiyonu bir etkinliğe dönüştüren kampanya görselleri, Reels kapakları ve lansman videoları.",
    },
    services: ["fashion", "video", "social"],
    concepts: [
      {
        format: "reel",
        image: images.fashionRedDress,
        alt: { en: "Woman in a flowing red dress", tr: "Dalgalanan kırmızı elbiseli kadın" },
        overlay: { en: "New Season", tr: "Yeni Sezon" },
        caption: { en: "Vertical reel concept with editorial motion.", tr: "Editoryal hareketli dikey Reels konsepti." },
        video: videos.fashionReel,
      },
      {
        format: "post",
        image: images.fashionEditorial,
        alt: { en: "Model in a pink ruffled blouse in a field", tr: "Tarlada pembe fırfırlı bluzlu model" },
        overlay: { en: "The Soft Edit", tr: "Zarif Seçki" },
        caption: { en: "Campaign image for a new collection.", tr: "Yeni koleksiyon için kampanya görseli." },
      },
      {
        format: "model",
        image: images.fashionBlazer,
        alt: { en: "Model in a camel blazer seated on a stool", tr: "Taburede oturan deve tüyü ceketli model" },
        overlay: { en: "Look 03", tr: "Kombin 03" },
        caption: {
          en: "Direction board for an AI-assisted model concept. Real AI visuals are always disclosed.",
          tr: "Yapay zekâ destekli model konsepti için yön panosu. Yapay zekâ görselleri her zaman belirtilir.",
        },
      },
      {
        format: "offer",
        image: images.productRomper,
        alt: { en: "Olive romper on a hanger", tr: "Askıda haki tulum" },
        overlay: { en: "Summer Edit", tr: "Yaz Seçkisi" },
        caption: { en: "Product photo turned into an advert.", tr: "Reklama dönüştürülmüş ürün fotoğrafı." },
      },
      {
        format: "video",
        image: images.boutiqueInterior,
        alt: { en: "Bright boutique interior", tr: "Aydınlık butik iç mekânı" },
        overlay: { en: "Just Arrived", tr: "Yeni Geldi" },
        caption: { en: "Widescreen collection launch film.", tr: "Yatay koleksiyon lansman filmi." },
        video: videos.boutiqueCollection,
      },
    ],
  },
  {
    id: "beauty",
    label: { en: "Beauty & Skincare", tr: "Güzellik ve Cilt Bakımı" },
    intro: {
      en: "Calm, tactile visuals for products and treatments — the kind people save and come back to.",
      tr: "Ürünler ve bakımlar için sakin, dokunsal görseller — insanların kaydedip tekrar baktığı türden.",
    },
    services: ["visual", "video", "social"],
    concepts: [
      {
        format: "reel",
        image: images.beautySerum,
        alt: { en: "Serum bottle in soft light", tr: "Yumuşak ışıkta serum şişesi" },
        overlay: { en: "Glow Ritual", tr: "Işıltı Ritüeli" },
        caption: { en: "Slow product reel for skincare.", tr: "Cilt bakımı için yavaş tempolu ürün Reels’i." },
        video: videos.beautyReel,
      },
      {
        format: "post",
        image: images.beautyMakeup,
        alt: { en: "Makeup brushes and products on beige", tr: "Bej zemin üzerinde makyaj fırçaları ve ürünler" },
        overlay: { en: "Everyday Glow", tr: "Her Gün Işılda" },
        caption: { en: "Flat-lay product post.", tr: "Üstten çekim ürün gönderisi." },
      },
      {
        format: "story",
        image: images.beautyFacial,
        alt: { en: "Client enjoying a facial treatment", tr: "Yüz bakımının keyfini çıkaran müşteri" },
        overlay: { en: "Book Your Ritual", tr: "Randevunuzu Alın" },
        caption: { en: "Story that drives salon bookings.", tr: "Salon randevularına yönlendiren hikâye." },
      },
      {
        format: "offer",
        image: images.beautySkincare,
        alt: { en: "Skincare bottles arranged with stones", tr: "Taşlarla düzenlenmiş cilt bakım şişeleri" },
        overlay: { en: "Gift Set", tr: "Hediye Seti" },
        caption: { en: "Seasonal gift set promotion.", tr: "Sezonluk hediye seti tanıtımı." },
      },
    ],
  },
  {
    id: "restaurant",
    label: { en: "Restaurants & Cafes", tr: "Restoranlar ve Kafeler" },
    intro: {
      en: "Food advertising, menu promotions and Reels that bring people to the table.",
      tr: "İnsanları masaya getiren yemek reklamları, menü tanıtımları ve Reels içerikleri.",
    },
    services: ["video", "social", "creative"],
    concepts: [
      {
        format: "reel",
        image: images.foodCoffee,
        alt: { en: "Latte art coffees", tr: "Latte art kahveler" },
        overlay: { en: "Fresh Daily", tr: "Her Gün Taze" },
        caption: { en: "Café reel from cup to kitchen.", tr: "Fincandan mutfağa kafe Reels’i." },
        video: videos.restaurantReel,
      },
      {
        format: "offer",
        image: images.foodPizza,
        alt: { en: "Pizza with tomatoes and herbs", tr: "Domates ve otlarla pizza" },
        overlay: { en: "Weekend Special", tr: "Hafta Sonu Özel" },
        caption: { en: "Special offer post — your offer, your terms.", tr: "Özel fırsat gönderisi — fırsatı siz belirlersiniz." },
      },
      {
        format: "menu",
        image: images.foodFlatlay,
        alt: { en: "Steak salad dishes from above", tr: "Üstten görünümde biftek salata tabakları" },
        overlay: { en: "New on the Menu", tr: "Menüde Yeni" },
        caption: { en: "Menu launch promotion.", tr: "Yeni menü tanıtımı." },
      },
      {
        format: "story",
        image: images.restaurantTerrace,
        alt: { en: "Seaside restaurant terrace at dusk", tr: "Gün batımında deniz kenarı restoran terası" },
        overlay: { en: "Sunset Tables", tr: "Gün Batımı Masaları" },
        caption: { en: "Reservation story for evenings.", tr: "Akşam rezervasyonları için hikâye." },
      },
    ],
  },
  {
    id: "ecommerce",
    label: { en: "E-commerce", tr: "E-ticaret" },
    intro: {
      en: "Product ads, banners and launch videos designed to be clicked.",
      tr: "Tıklanmak için tasarlanmış ürün reklamları, afişler ve lansman videoları.",
    },
    services: ["video", "paid", "visual"],
    concepts: [
      {
        format: "video",
        image: images.productHeadphones,
        alt: { en: "Headphones on yellow", tr: "Sarı zeminde kulaklık" },
        overlay: { en: "Hear More", tr: "Daha Fazlasını Duy" },
        caption: { en: "Product spotlight video ad.", tr: "Ürün odaklı video reklam." },
        video: videos.productAd,
      },
      {
        format: "banner",
        image: images.productWatch,
        alt: { en: "White smartwatch", tr: "Beyaz akıllı saat" },
        overlay: { en: "Time, Simplified", tr: "Zamanın Sade Hâli" },
        caption: { en: "Clean store banner.", tr: "Sade mağaza afişi." },
      },
      {
        format: "offer",
        image: images.ecommerceBags,
        alt: { en: "Red and black shopping bags", tr: "Kırmızı ve siyah alışveriş poşetleri" },
        overlay: { en: "Season Sale", tr: "Sezon İndirimi" },
        caption: { en: "Campaign artwork for a sale.", tr: "İndirim dönemi için kampanya görseli." },
      },
      {
        format: "story",
        image: images.fashionShopping,
        alt: { en: "Woman with shopping bags", tr: "Alışveriş poşetli kadın" },
        overlay: { en: "Shop the Look", tr: "Bu Kombini Yakala" },
        caption: { en: "Shoppable story concept.", tr: "Alışverişe yönlendiren hikâye konsepti." },
      },
    ],
  },
  {
    id: "local",
    label: { en: "Local Businesses", tr: "Yerel İşletmeler" },
    intro: {
      en: "Friendly, recognisable content that keeps your neighbourhood thinking of you first.",
      tr: "Çevrenizdeki insanların aklına ilk sizi getiren samimi ve tanınır içerikler.",
    },
    services: ["social", "creative", "community"],
    concepts: [
      {
        format: "post",
        image: images.localOpenSign,
        alt: { en: "Open sign hanging in a shop door", tr: "Dükkân kapısında asılı “Açık” tabelası" },
        overlay: { en: "We’re Open", tr: "Açığız" },
        caption: { en: "Opening hours announcement.", tr: "Çalışma saatleri duyurusu." },
      },
      {
        format: "story",
        image: images.localShopCounter,
        alt: { en: "Card payment at a minimal shop counter", tr: "Sade bir dükkân tezgâhında kartla ödeme" },
        overlay: { en: "Visit Us Today", tr: "Bugün Bekleriz" },
        caption: { en: "Footfall story for local shops.", tr: "Yerel dükkânlar için ziyaret hikâyesi." },
      },
      {
        format: "post",
        image: images.localBusiness,
        alt: { en: "Shop staff helping a customer", tr: "Müşteriye yardım eden mağaza çalışanı" },
        overlay: { en: "Here to Help", tr: "Yardıma Hazırız" },
        caption: { en: "Friendly service-focused post.", tr: "Hizmet odaklı samimi gönderi." },
      },
      {
        format: "banner",
        image: images.boutiqueStore,
        alt: { en: "Colourful clothing shop interior", tr: "Renkli bir giyim dükkânı iç mekânı" },
        overlay: { en: "In Store Now", tr: "Şimdi Mağazada" },
        caption: { en: "Website banner for a local shop.", tr: "Yerel bir dükkân için web afişi." },
      },
    ],
  },
];
