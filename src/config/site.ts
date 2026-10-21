/**
 * ─────────────────────────────────────────────────────────────
 *  Sevil — BUSINESS & CONTACT SETTINGS
 * ─────────────────────────────────────────────────────────────
 *  Edit the values below (or set the matching environment
 *  variables) to switch contact options on.
 *
 *  Anything left as an empty string is hidden automatically:
 *  no fake phone numbers, e-mail addresses or links are shown.
 * ─────────────────────────────────────────────────────────────
 */

const env = (value: string | undefined, fallback = "") => (value ?? "").trim() || fallback;

export const siteConfig = {
  brand: "Sevil",
  tagline: "Bireysel Reklam Danışmanı",

  /**
   * Public address of the website, without a trailing slash,
   * e.g. "https://www.example.com". Used for the sitemap, canonical
   * URLs and social sharing previews. Leave empty until a domain exists.
   */
  siteUrl: env(process.env.NEXT_PUBLIC_SITE_URL),

  contact: {
    /** WhatsApp number in international format, digits only, e.g. "905xxxxxxxxx". */
    whatsapp: env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
    /** Business e-mail address, e.g. "hello@example.com". */
    email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    /** Optional phone number shown as text, e.g. "+90 5xx xxx xx xx". */
    phone: env(process.env.NEXT_PUBLIC_CONTACT_PHONE),
    /** Optional city / area, e.g. "İstanbul, Türkiye". */
    location: env(process.env.NEXT_PUBLIC_CONTACT_LOCATION),
  },

  /** Full profile URLs, e.g. "https://www.instagram.com/yourprofile". */
  social: {
    instagram: env(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    tiktok: env(process.env.NEXT_PUBLIC_TIKTOK_URL),
    facebook: env(process.env.NEXT_PUBLIC_FACEBOOK_URL),
  },

  /**
   * Optional form delivery service.
   * Paste an endpoint that accepts a JSON POST (for example a Formspree,
   * Getform or Basin form URL). When set, the quote wizard offers a
   * "Send request" button and only reports success after the service
   * confirms it received the request.
   */
  formEndpoint: env(process.env.NEXT_PUBLIC_FORM_ENDPOINT),
};

export const contactAvailability = {
  whatsapp: /^\d{8,15}$/.test(siteConfig.contact.whatsapp.replace(/\D/g, "")),
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(siteConfig.contact.email),
  form: /^https?:\/\//.test(siteConfig.formEndpoint),
};

export const whatsappDigits = () => siteConfig.contact.whatsapp.replace(/\D/g, "");

export const whatsappLink = (message: string) =>
  contactAvailability.whatsapp
    ? `https://wa.me/${whatsappDigits()}?text=${encodeURIComponent(message)}`
    : null;

export const emailLink = (subject: string, body: string) =>
  contactAvailability.email
    ? `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    : null;

/** Base URL used for metadata. Falls back to localhost when no domain is configured. */
export const metadataBaseUrl = siteConfig.siteUrl || "http://localhost:3000";
