# Sevil — Website

Bilingual (English / Turkish) website for **Sevil — Bireysel Reklam Danışmanı**: advertising videos, AI-assisted campaign content, social media management and digital marketing.

Built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide icons**. No paid APIs, no database and no admin dashboard: everything you normally change lives in a few clearly commented files.

---

## Contents

1. [Quick start](#1-quick-start)
2. [Pages and URLs](#2-pages-and-urls)
3. [Project structure](#3-project-structure)
4. [What you need to configure](#4-what-you-need-to-configure-before-launch)
5. [Contact details, WhatsApp and email](#5-contact-details-whatsapp-and-email)
6. [Form delivery](#6-form-delivery-optional)
7. [Editing text (English and Turkish)](#7-editing-text-english-and-turkish)
8. [Images, logo and videos](#8-images-logo-and-videos)
9. [Portfolio projects](#9-portfolio-projects)
10. [Before-and-after examples](#10-before-and-after-examples)
11. [Packages and prices](#11-packages-and-prices)
12. [Deployment](#12-deployment)
13. [Honesty rules built into the site](#13-honesty-rules-built-into-the-site)

---

## 1. Quick start

Requirements: **Node.js 20.9 or newer** and npm.

```bash
npm install          # install dependencies
npm run dev          # development server → http://localhost:3000
npm run lint         # code checks
npx tsc --noEmit     # TypeScript checks
npm run build        # production build
npm start            # run the production build → http://localhost:3000
```

---

## 2. Pages and URLs

Turkish is the default language: Turkish pages are at the main addresses, English pages under `/en`.

| Page | Turkish (default) | English |
|---|---|---|
| Home (all main sections) | `/` | `/en` |
| Boutique advertising landing page | `/butik-reklamlari` | `/en/fashion-advertising` |
| Privacy policy (template) | `/gizlilik` | `/en/privacy` |
| Sitemap / robots | `/sitemap.xml`, `/robots.txt` | — |

Home page sections, in order: Hero → Services → *See the Possibilities* (industry showcase) → Before & After → Portfolio → Social Media Preview Studio → How It Works → Why Sevil → Industries → Social media tiers → Package builder → Contact.

**Language:** visitors land on the Turkish site. The switcher in the header and footer remembers the choice in a cookie (`sevil_lang`), so visitors who switched to English are sent to the English version of a page on their next visit (see `src/proxy.ts`). The URLs are defined in one place: `routes` in `src/lib/i18n.ts`.

---

## 3. Project structure

```
2.png                         ← original Sevil logo (left untouched)
public/
  brand/sevil-logo.png        ← logo used on the site (trimmed from 2.png, transparent)
  brand/sevil-mark.png        ← the S symbol only
  brand/og-image.png          ← social sharing preview image
  images/                     ← photos (.webp) + CREDITS.md
  videos/                     ← concept videos (.mp4)
src/
  config/
    site.ts                   ← ★ contact details, WhatsApp, email, social links, form endpoint, domain
    media.ts                  ← ★ every image/video path in one place
    pricing.ts                ← ★ price estimator settings (prices start empty)
  content/                    ← ★ bilingual content (each item has { en, tr })
    services.ts               ← the 10 services
    showcase.ts               ← "See the Possibilities" industries & concepts
    portfolio.ts              ← portfolio projects & categories
    beforeAfter.ts            ← before/after examples
    industries.ts             ← industries we serve
    packages.ts               ← package builder options, presets, social media tiers
    faq.ts                    ← boutique page FAQ
    socialStudio.ts           ← social media mockup content
  i18n/
    en.ts                     ← ★ English interface text (headings, buttons, forms, errors, privacy policy…)
    tr.ts                     ← ★ Turkish interface text (must have the same keys as en.ts)
  app/
    (en)/en/…                 ← English pages (root layout sets <html lang="en">)
    (tr)/…                    ← Turkish pages, the default (root layout sets <html lang="tr">)
    sitemap.ts, robots.ts, icon.png, apple-icon.png, globals.css (colours & typography)
  components/                 ← layout, sections, quote wizard, UI building blocks
  lib/                        ← helpers (routing, metadata, quote summary, package calculations)
  proxy.ts                    ← remembers the visitor's language choice
```

Files marked ★ are the ones you will normally edit. After any change, run `npm run build` to check that everything still works.

---

## 4. What you need to configure before launch

Nothing below has been invented. Until you add these values, the related buttons and links are simply hidden.

| Setting | Where | Example format |
|---|---|---|
| Public domain | `siteUrl` in `src/config/site.ts` or `NEXT_PUBLIC_SITE_URL` | `https://www.yourdomain.com` |
| WhatsApp number | `NEXT_PUBLIC_WHATSAPP_NUMBER` | `905XXXXXXXXX` (country code, no `+` needed) |
| Email address | `NEXT_PUBLIC_CONTACT_EMAIL` | `hello@yourdomain.com` |
| Phone (shown as text, optional) | `NEXT_PUBLIC_CONTACT_PHONE` | `+90 5XX XXX XX XX` |
| Location (optional) | `NEXT_PUBLIC_CONTACT_LOCATION` | `İstanbul, Türkiye` |
| Instagram / TikTok / Facebook | `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_TIKTOK_URL`, `NEXT_PUBLIC_FACEBOOK_URL` | full `https://` profile URL |
| Form delivery endpoint (optional) | `NEXT_PUBLIC_FORM_ENDPOINT` | see section 6 |
| Prices (optional) | `src/config/pricing.ts` | see section 11 |
| Privacy policy details | `privacy` in `src/i18n/en.ts` and `src/i18n/tr.ts` | fill every `[bracket]` |
| Real portfolio work, videos and images | `src/content/portfolio.ts`, `src/config/media.ts` | see sections 8–10 |

---

## 5. Contact details, WhatsApp and email

Two ways to set values, use whichever you prefer:

**A. Environment file (recommended).** Create a file called `.env.local` in the project folder:

```bash
NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com
NEXT_PUBLIC_WHATSAPP_NUMBER=905XXXXXXXXX
NEXT_PUBLIC_CONTACT_EMAIL=hello@yourdomain.com
NEXT_PUBLIC_CONTACT_PHONE=+90 5XX XXX XX XX
NEXT_PUBLIC_CONTACT_LOCATION=İstanbul, Türkiye
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/yourprofile
NEXT_PUBLIC_TIKTOK_URL=https://www.tiktok.com/@yourprofile
NEXT_PUBLIC_FACEBOOK_URL=https://www.facebook.com/yourpage
NEXT_PUBLIC_FORM_ENDPOINT=
```

On Vercel or another host, add the same names under *Environment Variables*. Rebuild after changing them (the values are built into the site).

**B. Edit `src/config/site.ts` directly.** Replace the `env(...)` call with your value, for example `whatsapp: "905XXXXXXXXX",`.

What changes once they are set:

- **WhatsApp**: a floating WhatsApp button appears (bottom right) with a prefilled message in the visitor's language. WhatsApp also appears in the contact section, the footer and as a **Send via WhatsApp** option in the quote wizard, which fills in the full request summary. The prefilled greeting text is `contact.whatsappMessage` in `src/i18n/en.ts` / `tr.ts`.
- **Email**: shown in the contact section and footer, and as **Send via email** in the quote wizard (opens the visitor's email app with the summary filled in).
- **Social links**: icons appear in the footer and contact section.

---

## 6. Form delivery (optional)

Without any configuration, the quote wizard never pretends to send anything. Visitors can:
- send the summary via WhatsApp or email (once configured),
- copy the summary or download it as a `.txt` file.

Their answers are kept in their browser until they confirm the request was sent or click **Start over**.

To receive requests directly by email without opening WhatsApp or a mail app, connect a form service that accepts JSON, for example [Formspree](https://formspree.io), [Getform](https://getform.io) or [Basin](https://usebasin.com):

1. Create a form in the service and copy its endpoint URL (e.g. `https://formspree.io/f/xxxxxxx`).
2. Set `NEXT_PUBLIC_FORM_ENDPOINT` to that URL and rebuild.
3. A **Send request** button appears in the last wizard step. The site reports "sent" **only** when the service confirms receipt; on failure the visitor's details stay on the page.

The request includes a readable `summary` field plus every answer as a separate field.

---

## 7. Editing text (English and Turkish)

- **Interface text** (headings, buttons, form labels, validation messages, FAQ headings, privacy policy, etc.) lives in `src/i18n/en.ts` and `src/i18n/tr.ts`. Both files have the same structure; TypeScript reports an error if a key is missing in Turkish.
- **Content collections** (services, portfolio, industries, showcase, packages, FAQ, before/after) live in `src/content/`. Every text there is written as `{ en: "…", tr: "…" }`, so both languages are always edited together.
- Words wrapped in `*asterisks*` in headings are displayed in the italic accent style, e.g. `"Your Brand Deserves to Be *Seen.*"`.
- Page titles and descriptions for search engines are under `meta` in the i18n files.
- **Testimonials:** none are shown, because none exist yet. When you have genuine, approved testimonials, add a section rather than inventing any.

---

## 8. Images, logo and videos

**Logo.** The original `2.png` in the project root is untouched. The site uses `public/brand/sevil-logo.png` (the same artwork with the empty margins trimmed) and `public/brand/sevil-mark.png` (the symbol, used for the favicon). To update the logo, replace those files with new transparent PNGs of the same names. The browser icons are `src/app/icon.png` and `src/app/apple-icon.png`.

**Photos.** Every image path is listed in `src/config/media.ts`. To replace one, either overwrite the file in `public/images/` with the same name, or add a new file and change the path in `media.ts`. Use `.webp` or `.jpg`, roughly 1200–1800 px on the long side. Next.js resizes and optimises images automatically.

The current photos are **Unsplash stock photographs** (free to use under the Unsplash License; sources listed in `public/images/CREDITS.md`). They are labelled as concepts on the site. Replace them with your own work as it becomes available.

**Videos.** Put `.mp4` files (H.264, `faststart`, ideally under ~5 MB) in `public/videos/` and reference them in `src/config/media.ts` or directly in a portfolio entry. Videos load only when a visitor opens them; the small hero preview (`hero-preview.mp4`) starts after the page has loaded and is skipped for visitors who prefer reduced motion.

The current videos are short **motion demos made from the stock photos** (slow zoom and crossfade). They are labelled "Concept Project" and should be replaced with real work.

**YouTube / Vimeo.** Portfolio entries also accept `{ type: "youtube", id: "VIDEO_ID" }` or `{ type: "vimeo", id: "123456789" }`.

---

## 9. Portfolio projects

Edit `src/content/portfolio.ts`. Copy an existing entry and change it:

```ts
{
  id: "my-new-project",                       // unique, no spaces
  title: { en: "Autumn Collection Reel", tr: "Sonbahar Koleksiyonu Reels" },
  description: { en: "…", tr: "…" },
  categories: ["video", "fashion"],           // video | fashion | product | social | branding | campaign
  thumbnail: "/images/my-thumbnail.webp",
  thumbnailAlt: { en: "Describe the image", tr: "Görseli tanımlayın" },
  video: { type: "file", src: "/videos/my-video.mp4" },   // omit for a still image
  orientation: "portrait",                    // "portrait" (9:16) or "landscape" (16:9)
  industry: "fashion",
  projectType: { en: "Reel · 15 s", tr: "Reels · 15 sn" },
  isConcept: false,                           // false ONLY for real, approved client work
  overlay: { en: "New In", tr: "Yeni" },      // optional words printed on the thumbnail
},
```

Projects with `isConcept: true` show **Concept Project / Konsept Çalışma**; with `false` they show **Client Project / Müşteri Projesi**. Only publish client work you have permission to show, and never add results you can't verify.

---

## 10. Before-and-after examples

Edit `src/content/beforeAfter.ts`.

- The current examples are **demonstrations**: the "after" side is a campaign layout generated on the page from the *same* stock photo (headline, colour adjustment, brand colours). A note under the slider says so.
- To add a real transformation, set `before` to the original photo, `after` to the finished image, and `isDemonstration: false`. When `after` is set, the slider shows that image instead of the generated layout.
- The slider works with mouse, touch and keyboard (arrow keys, Home/End), and has *Show before / Split view / Show after* buttons.

---

## 11. Packages and prices

**Package builder options, presets and social media tiers:** `src/content/packages.ts`.
- `builderOptions`: the selectable items (toggles, quantities, choices) in six groups.
- `packagePresets`: Content Starter, Social Media Growth, Full Digital Presence, Custom Project. The quantities are only starting suggestions that visitors can change.
- `socialTiers`: the three social media support levels.

**Prices:** `src/config/pricing.ts`. The site is in `mode: "quote"`, so **no prices are shown anywhere**. To enable the indicative estimator:

1. Replace `null` with a number for every item you want priced, e.g. `posts: { amount: 250, billing: "monthly" }`.
   - Quantity items are priced **per unit** (per video, per post…).
   - Toggle items are a **flat** amount.
   - `videoFormat` is a per-video surcharge per format choice (`multiplyBy: "videoCount"`).
   - `billing`: `"oneOff"` or `"monthly"`; the summary shows separate one-off and monthly totals.
2. Optionally set "from" prices for the three tiers under `tiers`.
3. Set `currency` (e.g. `"TRY"`, `"EUR"`) and change `mode` to `"estimate"`.

The estimate always says it is indicative and not a binding offer, lists what is included and excluded, and keeps advertising spend separate. Items left as `null` are marked "priced individually".

---

## 12. Deployment

The site needs a Node.js host (it uses a small proxy for the language preference), so it is not a static export.

**Vercel (simplest):** import the project folder or Git repository at vercel.com, add the environment variables from section 5, and deploy. Then set `NEXT_PUBLIC_SITE_URL` to your final domain and redeploy, so the sitemap and sharing previews use the right address.

**Any Node server:** `npm ci && npm run build && npm start` (set `PORT` to change the port from 3000), behind a reverse proxy with HTTPS.

Before going live:
- [ ] Set the domain and contact details (sections 4–5).
- [ ] Complete and review the privacy policy (`privacy` in both i18n files). It is marked as a template on the page until you edit `reviewNotice`. Have it checked against KVKK/GDPR as applicable.
- [ ] Replace concept images and videos with your own work where possible.
- [ ] Test the quote wizard end to end with your WhatsApp/email/form settings.

---

## 13. Honesty rules built into the site

These are intentional. Please keep them when you edit content:

- No invented prices, client names, testimonials, statistics, follower counts, awards or partnerships.
- Demonstration work is labelled **Concept**; stock photos are credited in `public/images/CREDITS.md`.
- Organic growth is described separately from paid advertising, with no guarantees of followers, reach or sales.
- Advertising spend is stated as separate unless a written proposal includes it.
- The boutique page explains AI limitations (garment details, colours, fit, fabric) and states that AI-generated models are never presented as real people who wore the products.
- The quote wizard only says "sent" when a configured service has confirmed it.
