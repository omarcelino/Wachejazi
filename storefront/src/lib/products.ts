export type Audience = "Men" | "Women" | "Kids";

export type Badge = "Best Seller" | "New" | "Low Stock";

export type Product = {
  slug: string;
  name: string;
  category: string;
  audiences: Audience[];
  price: string;
  blurb: string;
  description: string;
  sizes: string[];
  fitNote: string;
  returnWindowDays: number;
  /** Pre-discount price. When set, `price` is shown as the sale price. */
  originalPrice?: string;
  badge?: Badge;
  /** Only set for badge: "Low Stock" — drives the urgency line on the product page. */
  stockLeft?: number;
  /** Slugs of items commonly bought alongside this one, for cross-sell. */
  pairsWith?: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "firm-ground-match-boots",
    name: "Firm-Ground Match Boots",
    category: "Football",
    audiences: ["Men", "Women"],
    price: "KSh 8,500",
    badge: "Best Seller",
    blurb: "Studs built for dry pitches, true to size.",
    description:
      "Conical studs for grip on firm, dry natural turf. Synthetic upper holds its shape after a full season of weekend matches.",
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    fitNote: "Runs true to size. Between sizes? Size up for thicker socks.",
    returnWindowDays: 14,
    pairsWith: ["grip-socks-3-pack", "pro-shin-guards"],
  },
  {
    slug: "distance-trainer-running-shoes",
    name: "Distance Trainer Running Shoes",
    category: "Running",
    audiences: ["Men", "Women"],
    price: "KSh 12,000",
    badge: "Best Seller",
    blurb: "Cushioned for weekly long runs on tarmac.",
    description:
      "Midsole tuned for tarmac and packed dirt over 10km-plus runs. Breathable mesh upper for warm-weather training.",
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    fitNote: "Runs half a size small — most customers order one size up.",
    returnWindowDays: 30,
    pairsWith: ["reflective-running-shorts", "gps-sports-watch"],
  },
  {
    slug: "adjustable-dumbbell-set-20kg",
    name: "Adjustable Dumbbell Set, 20kg",
    category: "Gym & Training",
    audiences: ["Men", "Women"],
    price: "KSh 15,000",
    blurb: "One pair, six weight settings, no rack needed.",
    description:
      "Dial-adjustable plates from 2.5kg to 20kg per hand. Replaces a full rack of fixed dumbbells in the space of one pair.",
    sizes: [],
    fitNote: "",
    returnWindowDays: 14,
  },
  {
    slug: "home-match-jersey",
    name: "Home Match Jersey",
    category: "Team Kits",
    audiences: ["Men", "Women"],
    price: "KSh 3,200",
    badge: "New",
    blurb: "Breathable mesh, printed name and number included.",
    description:
      "Official-cut home jersey in breathable mesh. Name and number printing included at checkout, ready before match day.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    fitNote: "Cut slim. Order one size up for a relaxed fit.",
    returnWindowDays: 7,
    pairsWith: ["away-match-jersey", "grip-socks-3-pack"],
  },
  {
    slug: "grip-socks-3-pack",
    name: "Grip Socks, 3-Pack",
    category: "Accessories",
    audiences: ["Men", "Women", "Kids"],
    price: "KSh 900",
    blurb: "Stops feet sliding inside the boot mid-match.",
    description:
      "Silicone grip pads across the footbed keep your foot locked in place during quick direction changes.",
    sizes: ["S / M", "L / XL"],
    fitNote: "One size fits most — pick L / XL for UK 9 and above.",
    returnWindowDays: 7,
  },
  {
    slug: "pro-shin-guards",
    name: "Pro Shin Guards",
    category: "Football",
    audiences: ["Men", "Women", "Kids"],
    price: "KSh 1,200",
    blurb: "Ankle-strap fit, sized for junior and adult legs.",
    description:
      "Hard-shell front panel with a padded back and ankle strap. Sized separately for junior and adult legs.",
    sizes: ["Junior", "Adult S/M", "Adult L/XL"],
    fitNote: "Measure shin length — sizing runs by leg length, not shoe size.",
    returnWindowDays: 14,
    pairsWith: ["firm-ground-match-boots", "grip-socks-3-pack"],
  },
  {
    slug: "goalkeeper-gloves",
    name: "Goalkeeper Gloves",
    category: "Football",
    audiences: ["Men", "Women"],
    price: "KSh 2,500",
    badge: "New",
    blurb: "Latex palm grip that holds up in wet conditions.",
    description:
      "Negative-cut latex palm for a close fit around the ball, with a wrist strap that stays secure through a full match.",
    sizes: ["6", "7", "8", "9", "10"],
    fitNote: "Glove size, not shoe size — measure palm width from thumb to pinky base.",
    returnWindowDays: 14,
  },
  {
    slug: "training-bibs-set-of-10",
    name: "Training Bibs, Set of 10",
    category: "Football",
    audiences: ["Men", "Women", "Kids"],
    price: "KSh 4,500",
    blurb: "Two colours of five, for splitting up a training scrimmage.",
    description:
      "Lightweight mesh bibs in two colourways, five each, for marking out teams in five-a-side or full-squad training.",
    sizes: [],
    fitNote: "",
    returnWindowDays: 14,
  },
  {
    slug: "indoor-court-basketball-shoes",
    name: "Indoor Court Basketball Shoes",
    category: "Basketball",
    audiences: ["Men", "Women"],
    price: "KSh 9,000",
    blurb: "Grip built for indoor courts, with ankle support for cutting.",
    description:
      "High-top build with a herringbone outsole for quick stops and direction changes on indoor courts.",
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    fitNote: "Runs true to size. High-top collar fits snug — break in before a full game.",
    returnWindowDays: 30,
  },
  {
    slug: "official-size-7-basketball",
    name: "Official Size 7 Basketball",
    category: "Basketball",
    audiences: ["Men", "Women"],
    price: "KSh 3,500",
    blurb: "Composite leather, grips the same indoors and outdoors.",
    description:
      "Regulation size 7 ball in composite leather — holds its grip and bounce consistently on both wood and asphalt courts.",
    sizes: [],
    fitNote: "",
    returnWindowDays: 14,
  },
  {
    slug: "reflective-running-shorts",
    name: "Reflective Running Shorts",
    category: "Running",
    audiences: ["Men", "Women"],
    price: "KSh 1,800",
    blurb: "Built-in liner and a side pocket that actually fits a phone.",
    description:
      "Quick-dry running shorts with a built-in brief liner and a zipped side pocket sized for a phone, not just a key.",
    sizes: ["S", "M", "L", "XL"],
    fitNote: "Runs true to size. Between sizes? Size down — the liner adds stretch.",
    returnWindowDays: 30,
  },
  {
    slug: "gps-sports-watch",
    name: "GPS Sports Watch",
    category: "Running",
    audiences: ["Men", "Women"],
    price: "KSh 18,500",
    blurb: "Tracks pace, distance and heart rate for up to 7 days a charge.",
    description:
      "On-wrist GPS tracking for pace, distance and route, with continuous heart-rate monitoring and a week of battery between charges.",
    sizes: [],
    fitNote: "",
    returnWindowDays: 14,
  },
  {
    slug: "resistance-bands-set",
    name: "Resistance Bands Set",
    category: "Gym & Training",
    audiences: ["Men", "Women"],
    price: "KSh 2,200",
    blurb: "Five resistance levels plus a door anchor, packs into a gym bag.",
    description:
      "Five bands from light to heavy resistance, with handles, ankle straps and a door anchor for a full home workout.",
    sizes: [],
    fitNote: "",
    returnWindowDays: 14,
  },
  {
    slug: "non-slip-yoga-mat",
    name: "Non-Slip Yoga Mat",
    category: "Gym & Training",
    audiences: ["Men", "Women"],
    price: "KSh 2,800",
    blurb: "6mm thick with a carry strap included.",
    description:
      "Double-sided non-slip texture at 6mm thickness, cushioned enough for floor work without losing stability for standing poses.",
    sizes: [],
    fitNote: "",
    returnWindowDays: 14,
  },
  {
    slug: "away-match-jersey",
    name: "Away Match Jersey",
    category: "Team Kits",
    audiences: ["Men", "Women"],
    price: "KSh 3,200",
    blurb: "Same breathable mesh as the home kit, away colourway.",
    description:
      "Official-cut away jersey in breathable mesh. Name and number printing included at checkout, ready before match day.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    fitNote: "Cut slim. Order one size up for a relaxed fit.",
    returnWindowDays: 7,
  },
  {
    slug: "kids-turf-trainers",
    name: "Kids' Turf Trainers",
    category: "Football",
    audiences: ["Kids"],
    price: "KSh 3,800",
    blurb: "Rubber studs for astro turf, sized for growing feet.",
    description:
      "Junior boot built for artificial turf, with a padded ankle collar and rubber studs that grip without digging in.",
    sizes: ["28", "30", "32", "34", "36", "38"],
    fitNote: "Sizes run large to allow for a season of growth — measure feet fresh, not last year's size.",
    returnWindowDays: 30,
  },
  {
    slug: "junior-home-jersey",
    name: "Junior Home Jersey",
    category: "Team Kits",
    audiences: ["Kids"],
    price: "KSh 2,200",
    blurb: "Same home colourway, cut for kids.",
    description:
      "The home kit's breathable mesh in junior sizing, with name and number printing included at checkout.",
    sizes: ["XS (4-5y)", "S (6-7y)", "M (8-9y)", "L (10-11y)", "XL (12-13y)"],
    fitNote: "Sized by age. Between ages? Size up — it's worn for a full season.",
    returnWindowDays: 7,
  },
  {
    slug: "city-commuter-bicycle",
    name: "City Commuter Bicycle",
    category: "Cycling",
    audiences: ["Men", "Women"],
    price: "KSh 32,000",
    blurb: "21-speed, built for tarmac and light gravel commutes.",
    description:
      "A 21-speed drivetrain on a step-through frame, with front and rear reflectors and a rear rack ready for panniers.",
    sizes: ["Small", "Medium", "Large"],
    fitNote: "Frame size runs by rider height — Small fits up to 165cm, Medium up to 178cm, Large above that.",
    returnWindowDays: 14,
    pairsWith: ["cycling-helmet"],
  },
  {
    slug: "adult-mountain-bike",
    name: "Adult Mountain Bike",
    category: "Cycling",
    audiences: ["Men", "Women"],
    price: "KSh 58,000",
    blurb: "Front suspension and wide-tread tyres for dirt trails.",
    description:
      "A front suspension fork and 27-speed drivetrain, with wide-tread tyres built for dirt trails and rocky fire roads.",
    sizes: ["Medium", "Large"],
    fitNote: "Runs on the larger side — riders under 165cm usually prefer Medium.",
    returnWindowDays: 14,
    pairsWith: ["cycling-helmet"],
  },
  {
    slug: "kids-bicycle-20-inch",
    name: "Kids' Bicycle, 20-inch",
    category: "Cycling",
    audiences: ["Kids"],
    price: "KSh 22,500",
    blurb: "Training wheels included, sized for ages 6–9.",
    description:
      "20-inch wheels with removable training wheels, a coaster brake, and a low step-through frame for kids learning to ride.",
    sizes: [],
    fitNote: "Sized for a 51–61cm inseam (roughly ages 6–9) — check inseam, not just age.",
    returnWindowDays: 14,
  },
  {
    slug: "cycling-helmet",
    name: "Cycling Helmet",
    category: "Cycling",
    audiences: ["Men", "Women", "Kids"],
    price: "KSh 3,200",
    blurb: "Vented shell with an adjustable rear dial.",
    description:
      "A vented shell over an impact-absorbing liner, with a rear dial that adjusts fit without needing to remove the helmet.",
    sizes: ["S", "M", "L"],
    fitNote: "Measure head circumference — S fits 52–56cm, M 56–60cm, L 60–64cm.",
    returnWindowDays: 14,
  },
  {
    slug: "graphite-tennis-racquet",
    name: "Graphite Tennis Racquet",
    category: "Tennis & Badminton",
    audiences: ["Men", "Women"],
    price: "KSh 6,500",
    blurb: "Lightweight graphite frame, pre-strung and ready to play.",
    description:
      "A lightweight graphite frame strung at the factory, balanced for club-level groundstrokes without feeling head-heavy.",
    sizes: ["Grip 2", "Grip 3", "Grip 4"],
    fitNote: "Grip size is handle circumference — Grip 3 fits most adult hands.",
    returnWindowDays: 14,
  },
  {
    slug: "badminton-racquet-set",
    name: "Badminton Racquet Set, 2-Pack",
    category: "Tennis & Badminton",
    audiences: ["Men", "Women", "Kids"],
    price: "KSh 2,800",
    blurb: "Two racquets and three shuttlecocks, ready for a backyard match.",
    description:
      "Two aluminium racquets and three feather-look shuttlecocks in a carry sleeve — enough to start a match on arrival.",
    sizes: [],
    fitNote: "",
    returnWindowDays: 14,
  },
  {
    slug: "all-court-tennis-shoes",
    name: "All-Court Tennis Shoes",
    category: "Tennis & Badminton",
    audiences: ["Men", "Women"],
    price: "KSh 7,500",
    blurb: "Herringbone outsole grips hard and clay courts alike.",
    description:
      "A herringbone outsole pattern built for lateral movement, with reinforced toe caps for court-surface drag.",
    sizes: ["39", "40", "41", "42", "43", "44"],
    fitNote: "Runs true to size.",
    returnWindowDays: 30,
  },
  {
    slug: "official-volleyball",
    name: "Official Volleyball",
    category: "Volleyball & Rugby",
    audiences: ["Men", "Women", "Kids"],
    price: "KSh 2,800",
    blurb: "Soft-touch cover, indoor and beach ready.",
    description:
      "A soft-touch composite cover that's gentle on the forearms during digs, with consistent flight both indoors and on sand.",
    sizes: [],
    fitNote: "",
    returnWindowDays: 14,
  },
  {
    slug: "rugby-union-ball-size-5",
    name: "Rugby Union Ball, Size 5",
    category: "Volleyball & Rugby",
    audiences: ["Men", "Women"],
    price: "KSh 3,200",
    blurb: "Grippy rubber panels for wet-weather matches.",
    description:
      "Regulation size 5 match ball with a grippy rubber panel texture that holds up when the pitch turns wet.",
    sizes: [],
    fitNote: "",
    returnWindowDays: 14,
  },
  {
    slug: "rugby-scrum-cap",
    name: "Rugby Scrum Cap",
    category: "Volleyball & Rugby",
    audiences: ["Men", "Women"],
    price: "KSh 2,400",
    blurb: "Padded protection that doesn't block peripheral vision.",
    description:
      "Low-profile padded panels protect ears and scalp in the scrum without restricting peripheral vision in open play.",
    sizes: ["S", "M", "L"],
    fitNote: "Snug is correct — it should compress slightly against the head to stay put.",
    returnWindowDays: 14,
  },
  {
    slug: "racing-swim-goggles",
    name: "Racing Swim Goggles",
    category: "Swimming",
    audiences: ["Men", "Women", "Kids"],
    price: "KSh 1,500",
    blurb: "Anti-fog lenses with a silicone seal.",
    description:
      "Anti-fog coated lenses on a low-profile frame, with a silicone gasket that seals without leaving deep marks.",
    sizes: ["Adult", "Junior"],
    fitNote: "Junior fits smaller faces — check for a gap-free seal before buying adult size for a child.",
    returnWindowDays: 14,
    pairsWith: ["training-swimsuit", "silicone-swim-cap"],
  },
  {
    slug: "training-swimsuit",
    name: "Training Swimsuit",
    category: "Swimming",
    audiences: ["Men", "Women"],
    price: "KSh 3,500",
    blurb: "Chlorine-resistant fabric holds shape through daily laps.",
    description:
      "Chlorine-resistant fabric that resists thinning and fading through daily training laps, not just the occasional swim.",
    sizes: ["S", "M", "L", "XL"],
    fitNote: "Should feel snug when dry — it loosens slightly once wet.",
    returnWindowDays: 14,
  },
  {
    slug: "silicone-swim-cap",
    name: "Silicone Swim Cap",
    category: "Swimming",
    audiences: ["Men", "Women", "Kids"],
    price: "KSh 800",
    blurb: "One size, keeps hair out of the water without pulling.",
    description:
      "Soft silicone that stretches to fit most head sizes and hair lengths without pulling or pinching at the edges.",
    sizes: [],
    fitNote: "",
    returnWindowDays: 7,
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

/** Products explicitly flagged "New" — real merchandising data, not derived/fabricated. */
export function getNewArrivals(): Product[] {
  return PRODUCTS.filter((product) => product.badge === "New");
}

export type Category = {
  name: string;
  slug: string;
  icon: string;
};

export const CATEGORIES: Category[] = [
  { name: "Football", slug: "football", icon: "sports_soccer" },
  { name: "Running", slug: "running", icon: "directions_run" },
  { name: "Basketball", slug: "basketball", icon: "sports_basketball" },
  { name: "Gym & Training", slug: "gym-training", icon: "fitness_center" },
  { name: "Team Kits", slug: "team-kits", icon: "checkroom" },
  { name: "Cycling", slug: "cycling", icon: "directions_bike" },
  { name: "Tennis & Badminton", slug: "tennis-badminton", icon: "sports_tennis" },
  { name: "Volleyball & Rugby", slug: "volleyball-rugby", icon: "sports_volleyball" },
  { name: "Swimming", slug: "swimming", icon: "pool" },
  { name: "Accessories", slug: "accessories", icon: "backpack" },
];

export function getCategories(): (Category & { count: number })[] {
  return CATEGORIES.map((category) => ({
    ...category,
    count: PRODUCTS.filter((product) => product.category === category.name).length,
  })).filter((category) => category.count > 0);
}

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}

export function getCategoryByName(name: string): Category | undefined {
  return CATEGORIES.find((category) => category.name === name);
}

export function getProductsByCategory(categoryName: string): Product[] {
  return PRODUCTS.filter((product) => product.category === categoryName);
}

export type AudienceInfo = {
  name: Audience;
  slug: string;
  icon: string;
};

export const AUDIENCES: AudienceInfo[] = [
  { name: "Men", slug: "men", icon: "man" },
  { name: "Women", slug: "women", icon: "woman" },
  { name: "Kids", slug: "kids", icon: "child_care" },
];

export function getAudiences(): (AudienceInfo & { count: number })[] {
  return AUDIENCES.map((audience) => ({
    ...audience,
    count: PRODUCTS.filter((product) => product.audiences.includes(audience.name)).length,
  }));
}

export function getAudience(slug: string): AudienceInfo | undefined {
  return AUDIENCES.find((audience) => audience.slug === slug);
}

export function getProductsByAudience(audience: Audience): Product[] {
  return PRODUCTS.filter((product) => product.audiences.includes(audience));
}

export function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9]/g, ""));
}

export function formatKSh(amount: number): string {
  return `KSh ${amount.toLocaleString("en-KE")}`;
}

export function getDiscountPercent(product: Product): number | null {
  if (!product.originalPrice) return null;
  const original = parsePrice(product.originalPrice);
  const current = parsePrice(product.price);
  if (!original || original <= current) return null;
  return Math.round((1 - current / original) * 100);
}
