import type { L } from "@/lib/i18n";
import { images } from "@/config/media";
import type { ServiceId } from "./services";

/** "Industries we serve" — edit the needs and suggested services here. */
export type Industry = {
  id: string;
  name: L;
  image: string;
  imageAlt: L;
  needs: L[];
  services: ServiceId[];
  featured?: boolean;
};

export const industries: Industry[] = [
  {
    id: "fashion",
    name: { en: "Fashion & Boutiques", tr: "Moda ve Butikler" },
    image: images.fashionCityCoat,
    imageAlt: { en: "Fashionable woman in a blue coat", tr: "Mavi paltolu şık kadın" },
    needs: [
      { en: "Fresh content for every new arrival", tr: "Her yeni ürün için taze içerik" },
      { en: "Campaign looks without a shoot for every idea", tr: "Her fikir için çekim gerektirmeyen kampanya görünümleri" },
      { en: "Reels that show fit, movement and style", tr: "Kesim, hareket ve stili gösteren Reels" },
    ],
    services: ["fashion", "video", "social", "visual"],
    featured: true,
  },
  {
    id: "beauty",
    name: { en: "Beauty & Skincare", tr: "Güzellik ve Cilt Bakımı" },
    image: images.beautyPortrait,
    imageAlt: { en: "Portrait in soft blue light", tr: "Yumuşak mavi ışıkta portre" },
    needs: [
      { en: "Elegant product and treatment visuals", tr: "Zarif ürün ve bakım görselleri" },
      { en: "Booking-focused stories", tr: "Randevuya yönlendiren hikâyeler" },
      { en: "A calm, consistent feed", tr: "Sakin ve tutarlı bir akış" },
    ],
    services: ["visual", "social", "community"],
  },
  {
    id: "restaurant",
    name: { en: "Restaurants & Cafes", tr: "Restoranlar ve Kafeler" },
    image: images.restaurantInterior,
    imageAlt: { en: "Warm restaurant interior", tr: "Sıcak bir restoran iç mekânı" },
    needs: [
      { en: "Menu launches and daily specials", tr: "Menü lansmanları ve günün fırsatları" },
      { en: "Appetising Reels", tr: "İştah açan Reels" },
      { en: "Fast replies to reservation messages", tr: "Rezervasyon mesajlarına hızlı yanıt" },
    ],
    services: ["video", "social", "community"],
  },
  {
    id: "ecommerce",
    name: { en: "E-commerce", tr: "E-ticaret" },
    image: images.productHeadphones,
    imageAlt: { en: "Headphones product shot", tr: "Kulaklık ürün çekimi" },
    needs: [
      { en: "A steady flow of ad creative", tr: "Sürekli yenilenen reklam kreatifleri" },
      { en: "Product videos from existing photos", tr: "Mevcut fotoğraflardan ürün videoları" },
      { en: "Landing pages for campaigns", tr: "Kampanyalar için açılış sayfaları" },
    ],
    services: ["paid", "video", "web"],
  },
  {
    id: "local",
    name: { en: "Local Businesses", tr: "Yerel İşletmeler" },
    image: images.localOpenSign,
    imageAlt: { en: "Open sign in a shop window", tr: "Vitrinde “Açık” tabelası" },
    needs: [
      { en: "Being found and remembered nearby", tr: "Yakın çevrede bulunmak ve hatırlanmak" },
      { en: "Simple, regular posting", tr: "Basit ve düzenli paylaşım" },
      { en: "A clear website or contact page", tr: "Net bir web sitesi veya iletişim sayfası" },
    ],
    services: ["social", "web", "creative"],
  },
  {
    id: "personal",
    name: { en: "Personal Brands", tr: "Kişisel Markalar" },
    image: images.personalBrand,
    imageAlt: { en: "Man seated in front of a round window", tr: "Yuvarlak pencere önünde oturan adam" },
    needs: [
      { en: "A recognisable visual identity", tr: "Tanınır bir görsel kimlik" },
      { en: "Content that sounds like you", tr: "Sizin gibi konuşan içerikler" },
      { en: "Consistency without burnout", tr: "Tükenmeden süreklilik" },
    ],
    services: ["strategy", "social", "video"],
  },
  {
    id: "professional",
    name: { en: "Professional Services", tr: "Profesyonel Hizmetler" },
    image: images.professionalSuit,
    imageAlt: { en: "Man in a navy suit outside an office", tr: "Ofis önünde lacivert takım elbiseli adam" },
    needs: [
      { en: "Trust-building content", tr: "Güven oluşturan içerikler" },
      { en: "A professional website", tr: "Profesyonel bir web sitesi" },
      { en: "Clear explanations of what you offer", tr: "Sunduklarınızın net anlatımı" },
    ],
    services: ["web", "strategy", "creative"],
  },
];

/** Industry options in the quote wizard. */
export const wizardIndustries: { id: string; label: L }[] = [
  ...industries.map((i) => ({ id: i.id, label: i.name })),
  { id: "other", label: { en: "Other", tr: "Diğer" } },
];
