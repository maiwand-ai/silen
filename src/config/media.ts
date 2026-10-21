/**
 * ─────────────────────────────────────────────────────────────
 *  MEDIA LIBRARY — every image and video used on the site.
 * ─────────────────────────────────────────────────────────────
 *  To replace an image: put the new file in /public/images and
 *  change the path below (or overwrite the file with the same name).
 *  Photos are Unsplash stock images used as demonstration imagery
 *  (see /public/images/CREDITS.md). Replace them with your own work
 *  whenever it is available.
 * ─────────────────────────────────────────────────────────────
 */

export const logo = {
  /** Full logo (mark + wordmark + tagline), transparent PNG, 1200 × 628. */
  full: "/brand/sevil-logo.png",
  fullWidth: 1200,
  fullHeight: 628,
  /** Symbol only (the S with the green arrow). */
  mark: "/brand/sevil-mark.png",
};

const img = (name: string) => `/images/${name}.webp`;

export const images = {
  fashionRedDress: img("fashion-red-dress"),
  fashionCityCoat: img("fashion-city-coat"),
  fashionEditorial: img("fashion-editorial"),
  fashionPortrait: img("fashion-portrait"),
  fashionStreet: img("fashion-street"),
  fashionStudioGreen: img("fashion-studio-green"),
  fashionYellow: img("fashion-yellow"),
  fashionBlazer: img("fashion-blazer"),
  fashionLeather: img("fashion-leather"),
  fashionShopping: img("fashion-shopping"),
  boutiqueInterior: img("boutique-interior"),
  boutiqueRack: img("boutique-rack"),
  boutiqueHangers: img("boutique-hangers"),
  boutiqueRail: img("boutique-rail"),
  boutiqueTees: img("boutique-tees"),
  boutiqueKnitwear: img("boutique-knitwear"),
  boutiqueStore: img("boutique-store"),
  productRomper: img("product-romper"),
  productFlatlay: img("product-flatlay"),
  productHeadphones: img("product-headphones"),
  productWatch: img("product-watch"),
  beautyFacial: img("beauty-facial"),
  beautyMakeup: img("beauty-makeup"),
  beautySerum: img("beauty-serum"),
  beautyPortrait: img("beauty-portrait"),
  beautySkincare: img("beauty-skincare"),
  foodDining: img("food-dining"),
  foodCoffee: img("food-coffee"),
  foodFlatlay: img("food-flatlay"),
  foodPizza: img("food-pizza"),
  foodPizzaBoard: img("food-pizza-board"),
  foodChef: img("food-chef"),
  restaurantInterior: img("restaurant-interior"),
  restaurantTerrace: img("restaurant-terrace"),
  ecommerceBags: img("ecommerce-bags"),
  ecommerceCheckout: img("ecommerce-checkout"),
  localOpenSign: img("local-open-sign"),
  localBusiness: img("local-business"),
  localShopCounter: img("local-shop-counter"),
  professionalSuit: img("professional-suit"),
  personalBrand: img("personal-brand"),
};

/**
 * Videos. Local files live in /public/videos.
 * The current files are short motion demos made from the stock photos
 * above — they are labelled as concepts on the site.
 */
export const videos = {
  heroPreview: "/videos/hero-preview.mp4",
  fashionReel: "/videos/fashion-reel-concept.mp4",
  beautyReel: "/videos/beauty-reel-concept.mp4",
  restaurantReel: "/videos/restaurant-reel-concept.mp4",
  productAd: "/videos/product-ad-concept.mp4",
  boutiqueCollection: "/videos/boutique-collection-concept.mp4",
};

/** Hero section visuals (home page). */
export const heroMedia = {
  main: images.fashionRedDress,
  previewVideo: videos.heroPreview,
  previewPoster: images.fashionCityCoat,
  cards: [images.beautySerum, images.foodCoffee, images.boutiqueKnitwear],
};

/** Boutique landing page hero visuals. */
export const boutiqueMedia = {
  hero: images.fashionEditorial,
  secondary: images.fashionBlazer,
  rack: images.boutiqueRack,
};
