import type { L } from "@/lib/i18n";
import type { ServiceId } from "./services";

/**
 * ─────────────────────────────────────────────────────────────
 *  PACKAGE BUILDER — options, presets and social media tiers
 * ─────────────────────────────────────────────────────────────
 *  Prices are NOT stored here. See src/config/pricing.ts.
 */

export type BuilderGroupId = "video" | "social" | "content" | "ads" | "web" | "support";

export type BuilderOption =
  | { id: string; group: BuilderGroupId; kind: "toggle"; label: L; hint?: L; service: ServiceId }
  | {
      id: string;
      group: BuilderGroupId;
      kind: "quantity";
      label: L;
      hint?: L;
      max: number;
      step?: number;
      service: ServiceId;
    }
  | {
      id: string;
      group: BuilderGroupId;
      kind: "choice";
      label: L;
      hint?: L;
      choices: { id: string; label: L }[];
      /** Only shown when this other option is selected. */
      dependsOn?: string;
      service: ServiceId;
    };

export const builderGroups: { id: BuilderGroupId; label: L; description: L }[] = [
  {
    id: "video",
    label: { en: "Video production", tr: "Video prodüksiyonu" },
    description: { en: "Promotional, product and fashion videos.", tr: "Tanıtım, ürün ve moda videoları." },
  },
  {
    id: "social",
    label: { en: "Social media management", tr: "Sosyal medya yönetimi" },
    description: { en: "Platforms we look after and how.", tr: "Yönettiğimiz platformlar ve kapsamı." },
  },
  {
    id: "content",
    label: { en: "Content creation", tr: "İçerik üretimi" },
    description: { en: "Monthly posts, stories and Reels.", tr: "Aylık gönderi, hikâye ve Reels içerikleri." },
  },
  {
    id: "ads",
    label: { en: "Advertising management", tr: "Reklam yönetimi" },
    description: {
      en: "Advertising spend is paid separately unless your written proposal says otherwise.",
      tr: "Yazılı teklifte aksi belirtilmedikçe reklam bütçesi ayrıca ödenir.",
    },
  },
  {
    id: "web",
    label: { en: "Website services", tr: "Web sitesi hizmetleri" },
    description: { en: "Pages that turn attention into enquiries.", tr: "İlgiyi talebe dönüştüren sayfalar." },
  },
  {
    id: "support",
    label: { en: "Optional support", tr: "Ek destek" },
    description: { en: "Ongoing help around your content.", tr: "İçeriklerinize yönelik sürekli destek." },
  },
];

export const builderOptions: BuilderOption[] = [
  // A. Video production
  {
    id: "videoCount",
    group: "video",
    kind: "quantity",
    label: { en: "Promotional videos", tr: "Tanıtım videosu" },
    max: 30,
    service: "video",
  },
  {
    id: "videoFormat",
    group: "video",
    kind: "choice",
    dependsOn: "videoCount",
    label: { en: "Length / format", tr: "Süre / format" },
    choices: [
      { id: "short", label: { en: "Short (up to 15 s)", tr: "Kısa (15 sn’ye kadar)" } },
      { id: "standard", label: { en: "Standard (15–30 s)", tr: "Standart (15–30 sn)" } },
      { id: "long", label: { en: "Long (30–60 s)", tr: "Uzun (30–60 sn)" } },
      { id: "mixed", label: { en: "Mixed / not sure", tr: "Karışık / emin değilim" } },
    ],
    service: "video",
  },
  {
    id: "videoPhotos",
    group: "video",
    kind: "choice",
    dependsOn: "videoCount",
    label: { en: "Do you have product photos?", tr: "Ürün fotoğraflarınız var mı?" },
    choices: [
      { id: "yes", label: { en: "Yes", tr: "Evet" } },
      { id: "some", label: { en: "Some", tr: "Kısmen" } },
      { id: "no", label: { en: "Not yet", tr: "Henüz yok" } },
    ],
    service: "video",
  },
  {
    id: "videoAiFashion",
    group: "video",
    kind: "toggle",
    label: { en: "AI-assisted fashion concepts", tr: "Yapay zekâ destekli moda konseptleri" },
    hint: { en: "Campaign concepts built around your garments.", tr: "Ürünleriniz etrafında kurgulanan kampanya konseptleri." },
    service: "fashion",
  },

  // B. Social media management
  { id: "instagram", group: "social", kind: "toggle", label: { en: "Instagram", tr: "Instagram" }, service: "social" },
  { id: "tiktok", group: "social", kind: "toggle", label: { en: "TikTok", tr: "TikTok" }, service: "social" },
  { id: "facebook", group: "social", kind: "toggle", label: { en: "Facebook", tr: "Facebook" }, service: "social" },
  {
    id: "publishing",
    group: "social",
    kind: "toggle",
    label: { en: "Publishing on your behalf", tr: "Sizin adınıza paylaşım" },
    hint: { en: "We schedule and post approved content.", tr: "Onaylanan içerikleri planlayıp paylaşırız." },
    service: "social",
  },

  // C. Content creation
  {
    id: "posts",
    group: "content",
    kind: "quantity",
    label: { en: "Posts per month", tr: "Aylık gönderi" },
    max: 60,
    service: "social",
  },
  {
    id: "stories",
    group: "content",
    kind: "quantity",
    label: { en: "Stories per month", tr: "Aylık hikâye" },
    max: 90,
    service: "social",
  },
  {
    id: "reels",
    group: "content",
    kind: "quantity",
    label: { en: "Reels per month", tr: "Aylık Reels" },
    max: 30,
    service: "video",
  },
  {
    id: "imageEnhancement",
    group: "content",
    kind: "quantity",
    label: { en: "Product photos to enhance", tr: "Düzenlenecek ürün fotoğrafı" },
    max: 200,
    step: 5,
    service: "visual",
  },
  {
    id: "contentPlanning",
    group: "content",
    kind: "toggle",
    label: { en: "Monthly content planning", tr: "Aylık içerik planlaması" },
    service: "strategy",
  },

  // D. Advertising management
  { id: "adCreative", group: "ads", kind: "toggle", label: { en: "Campaign creative", tr: "Kampanya kreatifleri" }, service: "creative" },
  { id: "adSetup", group: "ads", kind: "toggle", label: { en: "Campaign setup", tr: "Kampanya kurulumu" }, service: "paid" },
  { id: "adManagement", group: "ads", kind: "toggle", label: { en: "Campaign management", tr: "Kampanya yönetimi" }, service: "paid" },
  { id: "adReporting", group: "ads", kind: "toggle", label: { en: "Performance reporting", tr: "Performans raporlaması" }, service: "paid" },

  // E. Website services
  { id: "landingPage", group: "web", kind: "toggle", label: { en: "Landing page", tr: "Açılış sayfası" }, service: "web" },
  { id: "businessWebsite", group: "web", kind: "toggle", label: { en: "Business website", tr: "Kurumsal web sitesi" }, service: "web" },
  { id: "campaignWebsite", group: "web", kind: "toggle", label: { en: "Campaign website", tr: "Kampanya sitesi" }, service: "web" },

  // F. Optional support
  {
    id: "community",
    group: "support",
    kind: "toggle",
    label: { en: "Community management", tr: "Topluluk yönetimi" },
    hint: { en: "Comments and direct messages.", tr: "Yorumlar ve direkt mesajlar." },
    service: "community",
  },
  { id: "monthlyReport", group: "support", kind: "toggle", label: { en: "Monthly reporting", tr: "Aylık raporlama" }, service: "strategy" },
  { id: "contentStrategy", group: "support", kind: "toggle", label: { en: "Content strategy", tr: "İçerik stratejisi" }, service: "strategy" },
];

export type BuilderValue = number | boolean | string;
export type BuilderState = Record<string, BuilderValue>;

export type PresetId = "starter" | "growth" | "full" | "custom";

export const packagePresets: { id: PresetId; name: L; description: L; state: BuilderState }[] = [
  {
    id: "starter",
    name: { en: "Content Starter", tr: "İçerik Başlangıç" },
    description: {
      en: "For businesses beginning their social media journey.",
      tr: "Sosyal medya yolculuğuna yeni başlayan işletmeler için.",
    },
    state: { instagram: true, posts: 8, stories: 8, reels: 2, contentPlanning: true },
  },
  {
    id: "growth",
    name: { en: "Social Media Growth", tr: "Sosyal Medya Büyüme" },
    description: {
      en: "For businesses seeking consistent content and management.",
      tr: "Düzenli içerik ve hesap yönetimi isteyen işletmeler için.",
    },
    state: {
      instagram: true,
      tiktok: true,
      publishing: true,
      posts: 12,
      stories: 12,
      reels: 4,
      contentPlanning: true,
      community: true,
      monthlyReport: true,
    },
  },
  {
    id: "full",
    name: { en: "Full Digital Presence", tr: "Tam Dijital Varlık" },
    description: {
      en: "Content, management, advertising creative and reporting together.",
      tr: "İçerik, yönetim, reklam kreatifi ve raporlama bir arada.",
    },
    state: {
      instagram: true,
      tiktok: true,
      facebook: true,
      publishing: true,
      posts: 16,
      stories: 16,
      reels: 6,
      videoCount: 2,
      videoFormat: "standard",
      contentPlanning: true,
      adCreative: true,
      adSetup: true,
      adManagement: true,
      adReporting: true,
      community: true,
      monthlyReport: true,
      contentStrategy: true,
    },
  },
  {
    id: "custom",
    name: { en: "Custom Project", tr: "Özel Proje" },
    description: {
      en: "Start from a blank sheet and choose exactly what you need.",
      tr: "Boş bir sayfadan başlayın, ihtiyacınız olanı seçin.",
    },
    state: {},
  },
];

/** Social media support levels shown in their own section. */
export const socialTiers: { id: string; name: L; tagline: L; items: L[]; service: ServiceId; featured?: boolean }[] = [
  {
    id: "content",
    name: { en: "Content Creation", tr: "İçerik Üretimi" },
    tagline: { en: "We create your content. You publish it.", tr: "İçeriklerinizi biz hazırlayalım, paylaşımlarınızı siz yapın." },
    items: [
      { en: "Promotional graphics", tr: "Tanıtım görselleri" },
      { en: "Reels and short videos", tr: "Reels ve kısa videolar" },
      { en: "Captions", tr: "Gönderi metinleri" },
      { en: "Content suggestions", tr: "İçerik önerileri" },
      { en: "Content delivery", tr: "İçerik teslimi" },
    ],
    service: "creative",
  },
  {
    id: "management",
    name: { en: "Social Media Management", tr: "Sosyal Medya Yönetimi" },
    tagline: {
      en: "We plan, prepare, and publish your content according to an agreed schedule.",
      tr: "İçeriklerinizi birlikte planlayalım; hazırlama ve paylaşım süreçlerini belirlenen takvime göre yönetelim.",
    },
    items: [
      { en: "Content calendar", tr: "İçerik takvimi" },
      { en: "Post creation", tr: "Gönderi hazırlama" },
      { en: "Reels", tr: "Reels" },
      { en: "Stories", tr: "Hikâyeler" },
      { en: "Publishing", tr: "Paylaşım" },
      { en: "Basic account management", tr: "Temel hesap yönetimi" },
      { en: "Agreed performance reports", tr: "Kararlaştırılan performans raporları" },
    ],
    service: "social",
    featured: true,
  },
  {
    id: "full",
    name: { en: "Full Digital Support", tr: "Tam Dijital Destek" },
    tagline: {
      en: "An integrated approach to content, social media, and advertising support.",
      tr: "İçerik, sosyal medya yönetimi ve reklam desteğini bir araya getiren kapsamlı bir hizmet.",
    },
    items: [
      { en: "Content strategy", tr: "İçerik stratejisi" },
      { en: "Content creation", tr: "İçerik üretimi" },
      { en: "Publishing", tr: "Paylaşım" },
      { en: "Community management", tr: "Topluluk yönetimi" },
      { en: "Advertising creative", tr: "Reklam kreatifleri" },
      { en: "Campaign support", tr: "Kampanya desteği" },
      { en: "Reporting", tr: "Raporlama" },
    ],
    service: "paid",
  },
];
