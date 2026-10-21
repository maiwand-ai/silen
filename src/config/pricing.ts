/**
 * ─────────────────────────────────────────────────────────────
 *  PRICE ESTIMATOR SETTINGS
 * ─────────────────────────────────────────────────────────────
 *  mode: "quote"     → no numbers are shown; visitors request a quote.
 *  mode: "estimate"  → an indicative estimate is calculated from the
 *                      prices below (only for options that have a price).
 *
 *  Every price starts as `null` (= not configured). Fill in real prices
 *  first, then switch `mode` to "estimate".
 *
 *  Option ids match those in src/content/packages.ts.
 *    • quantity options: price is per unit (e.g. per video, per post)
 *    • toggle options:   price is a flat amount
 *    • choice options:   price per choice; `multiplyBy` multiplies it
 *                        by the quantity of another option
 *  billing: "oneOff" (single project fee) or "monthly" (recurring).
 * ─────────────────────────────────────────────────────────────
 */

export type Billing = "oneOff" | "monthly";

export type PriceRule =
  | { amount: number | null; billing: Billing }
  | { perChoice: Record<string, number | null>; multiplyBy?: string; billing: Billing };

export const pricingConfig: {
  mode: "quote" | "estimate";
  currency: string;
  /** BCP 47 locale used to format numbers for each language. */
  numberLocale: { en: string; tr: string };
  rules: Record<string, PriceRule>;
  /** Optional "from" price per social media tier (ids from socialTiers in packages.ts). */
  tiers: Record<string, { amount: number | null; billing: Billing }>;
} = {
  mode: "quote",
  currency: "TRY",
  numberLocale: { en: "en-GB", tr: "tr-TR" },
  rules: {
    // Video production (per video; the format adds a per-video surcharge)
    videoCount: { amount: null, billing: "oneOff" },
    videoFormat: { perChoice: { short: null, standard: null, long: null, mixed: null }, multiplyBy: "videoCount", billing: "oneOff" },
    videoAiFashion: { amount: null, billing: "oneOff" },

    // Social media management (per platform, per month)
    instagram: { amount: null, billing: "monthly" },
    tiktok: { amount: null, billing: "monthly" },
    facebook: { amount: null, billing: "monthly" },
    publishing: { amount: null, billing: "monthly" },

    // Content creation (per item, per month)
    posts: { amount: null, billing: "monthly" },
    stories: { amount: null, billing: "monthly" },
    reels: { amount: null, billing: "monthly" },
    imageEnhancement: { amount: null, billing: "oneOff" },
    contentPlanning: { amount: null, billing: "monthly" },

    // Advertising management (fees only — advertising spend is separate)
    adCreative: { amount: null, billing: "monthly" },
    adSetup: { amount: null, billing: "oneOff" },
    adManagement: { amount: null, billing: "monthly" },
    adReporting: { amount: null, billing: "monthly" },

    // Website services
    landingPage: { amount: null, billing: "oneOff" },
    businessWebsite: { amount: null, billing: "oneOff" },
    campaignWebsite: { amount: null, billing: "oneOff" },

    // Optional support
    community: { amount: null, billing: "monthly" },
    monthlyReport: { amount: null, billing: "monthly" },
    contentStrategy: { amount: null, billing: "monthly" },
  },
  tiers: {
    content: { amount: null, billing: "monthly" },
    management: { amount: null, billing: "monthly" },
    full: { amount: null, billing: "monthly" },
  },
};
