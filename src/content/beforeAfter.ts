import type { L } from "@/lib/i18n";
import { images } from "@/config/media";

/**
 * ─────────────────────────────────────────────────────────────
 *  BEFORE & AFTER EXAMPLES
 * ─────────────────────────────────────────────────────────────
 *  Current examples are demonstrations: the "after" side is a
 *  campaign layout built on the site from the SAME stock photo.
 *
 *  To add a real transformation, set `after` to the finished image
 *  file and set `isDemonstration: false`. When `after` is set, the
 *  site shows that image instead of the built-in layout.
 * ─────────────────────────────────────────────────────────────
 */

export type BeforeAfterExample = {
  id: string;
  label: L;
  before: string;
  beforeAlt: L;
  /** Optional finished "after" image. If omitted, a styled campaign layout is generated from `before`. */
  after?: string;
  afterAlt: L;
  headline: L;
  kicker: L;
  changes: L[];
  /** CSS object-position for the photo inside the campaign layout. */
  focus?: string;
  isDemonstration: boolean;
};

export const beforeAfterExamples: BeforeAfterExample[] = [
  {
    id: "romper",
    label: { en: "Boutique product", tr: "Butik ürünü" },
    before: images.productRomper,
    beforeAlt: { en: "Plain photo of an olive romper on a hanger", tr: "Askıdaki haki tulumun sade fotoğrafı" },
    afterAlt: {
      en: "The same romper photo presented as a campaign post with headline and brand colours",
      tr: "Aynı tulum fotoğrafının başlık ve marka renkleriyle kampanya gönderisi olarak sunumu",
    },
    headline: { en: "Summer Edit", tr: "Yaz Seçkisi" },
    kicker: { en: "New in store", tr: "Mağazada yeni" },
    changes: [
      { en: "Campaign layout and headline", tr: "Kampanya düzeni ve başlık" },
      { en: "Colour grading for a warmer mood", tr: "Daha sıcak bir his için renk düzenleme" },
      { en: "Brand colours and call to action", tr: "Marka renkleri ve harekete geçirici mesaj" },
      { en: "Crop prepared for feed formats", tr: "Akış formatlarına uygun kırpma" },
    ],
    focus: "50% 35%",
    isDemonstration: true,
  },
  {
    id: "serum",
    label: { en: "Beauty product", tr: "Güzellik ürünü" },
    before: images.beautySerum,
    beforeAlt: { en: "Plain photo of a serum bottle", tr: "Serum şişesinin sade fotoğrafı" },
    afterAlt: {
      en: "The same serum photo presented as a skincare campaign visual",
      tr: "Aynı serum fotoğrafının cilt bakımı kampanya görseli olarak sunumu",
    },
    headline: { en: "Glow Ritual", tr: "Işıltı Ritüeli" },
    kicker: { en: "Skincare, simplified", tr: "Sade cilt bakımı" },
    changes: [
      { en: "Premium editorial typography", tr: "Premium editoryal tipografi" },
      { en: "Contrast and tone adjusted", tr: "Kontrast ve ton ayarı" },
      { en: "Story-ready vertical framing", tr: "Hikâyeye uygun dikey kadraj" },
    ],
    focus: "50% 55%",
    isDemonstration: true,
  },
  {
    id: "pizza",
    label: { en: "Restaurant dish", tr: "Restoran yemeği" },
    before: images.foodPizzaBoard,
    beforeAlt: { en: "Plain photo of a pizza on a board", tr: "Tahta üzerinde pizzanın sade fotoğrafı" },
    afterAlt: {
      en: "The same pizza photo presented as a weekend promotion",
      tr: "Aynı pizza fotoğrafının hafta sonu kampanyası olarak sunumu",
    },
    headline: { en: "Weekend Special", tr: "Hafta Sonu Özel" },
    kicker: { en: "Fresh from the oven", tr: "Fırından yeni çıktı" },
    changes: [
      { en: "Appetising colour boost", tr: "İştah açan renk dokunuşu" },
      { en: "Offer-ready layout", tr: "Kampanyaya hazır düzen" },
      { en: "Clear call to action", tr: "Net harekete geçirici mesaj" },
    ],
    focus: "50% 50%",
    isDemonstration: true,
  },
];
