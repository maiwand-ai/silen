import type { L } from "@/lib/i18n";
import { images } from "@/config/media";

/**
 * Social Media Preview Studio — example mockups.
 * These are illustrative only and are not connected to any account.
 */

export type StudioTile = { image: string; alt: L; overlay?: L; tone?: "navy" | "lime" | "light" };

export const studioFeed: StudioTile[] = [
  { image: images.fashionRedDress, alt: { en: "Red dress", tr: "Kırmızı elbise" }, overlay: { en: "New Season", tr: "Yeni Sezon" } },
  { image: images.boutiqueKnitwear, alt: { en: "Knitwear rail", tr: "Triko askısı" } },
  { image: images.productRomper, alt: { en: "Olive romper", tr: "Haki tulum" }, overlay: { en: "Summer Edit", tr: "Yaz Seçkisi" }, tone: "lime" },
  { image: images.fashionEditorial, alt: { en: "Pink blouse editorial", tr: "Pembe bluz editoryali" } },
  { image: images.boutiqueHangers, alt: { en: "Clothes on hangers", tr: "Askıdaki kıyafetler" }, overlay: { en: "Just Arrived", tr: "Yeni Geldi" }, tone: "navy" },
  { image: images.fashionStreet, alt: { en: "Street style coat", tr: "Sokak stili palto" } },
  { image: images.fashionBlazer, alt: { en: "Camel blazer look", tr: "Deve tüyü ceket kombini" } },
  { image: images.boutiqueTees, alt: { en: "Green shirts on hangers", tr: "Askıda yeşil gömlekler" }, overlay: { en: "Basics", tr: "Temel Parçalar" }, tone: "light" },
  { image: images.fashionCityCoat, alt: { en: "Blue coat in the city", tr: "Şehirde mavi palto" } },
];

export const studioReels: StudioTile[] = [
  { image: images.fashionRedDress, alt: { en: "Red dress reel cover", tr: "Kırmızı elbise Reels kapağı" }, overlay: { en: "How to Style Red", tr: "Kırmızı Nasıl Kombinlenir" } },
  { image: images.foodCoffee, alt: { en: "Coffee reel cover", tr: "Kahve Reels kapağı" }, overlay: { en: "Morning Ritual", tr: "Sabah Ritüeli" } },
  { image: images.beautySerum, alt: { en: "Serum reel cover", tr: "Serum Reels kapağı" }, overlay: { en: "3 Steps to Glow", tr: "Işıltıya 3 Adım" } },
  { image: images.fashionLeather, alt: { en: "Leather jacket reel cover", tr: "Deri ceket Reels kapağı" }, overlay: { en: "Behind the Look", tr: "Kombinin Hikâyesi" } },
];

export const studioStories: StudioTile[] = [
  { image: images.fashionEditorial, alt: { en: "Story: new arrivals", tr: "Hikâye: yeni gelenler" }, overlay: { en: "Swipe to see the new arrivals", tr: "Yeni gelenleri görmek için kaydırın" } },
  { image: images.restaurantTerrace, alt: { en: "Story: book a table", tr: "Hikâye: masa ayırtın" }, overlay: { en: "Book your sunset table", tr: "Gün batımı masanızı ayırtın" } },
  { image: images.beautyFacial, alt: { en: "Story: salon booking", tr: "Hikâye: salon randevusu" }, overlay: { en: "A moment just for you", tr: "Sadece size ait bir an" } },
];

export const studioCampaigns: (StudioTile & { ratio: "1/1" | "4/5" | "16/9" | "9/16"; format: L })[] = [
  { image: images.ecommerceBags, alt: { en: "Season sale artwork", tr: "Sezon indirimi görseli" }, overlay: { en: "Season Sale", tr: "Sezon İndirimi" }, ratio: "4/5", format: { en: "Feed ad · 4:5", tr: "Akış reklamı · 4:5" }, tone: "navy" },
  { image: images.productWatch, alt: { en: "Watch banner", tr: "Saat afişi" }, overlay: { en: "Time, Simplified", tr: "Zamanın Sade Hâli" }, ratio: "16/9", format: { en: "Web banner · 16:9", tr: "Web afişi · 16:9" }, tone: "light" },
  { image: images.fashionYellow, alt: { en: "Bold fashion ad", tr: "Cesur moda reklamı" }, overlay: { en: "Wear the Sun", tr: "Güneşi Giyin" }, ratio: "9/16", format: { en: "Story ad · 9:16", tr: "Hikâye reklamı · 9:16" }, tone: "lime" },
  { image: images.foodPizza, alt: { en: "Pizza promotion", tr: "Pizza kampanyası" }, overlay: { en: "Weekend Special", tr: "Hafta Sonu Özel" }, ratio: "1/1", format: { en: "Square post · 1:1", tr: "Kare gönderi · 1:1" } },
];
