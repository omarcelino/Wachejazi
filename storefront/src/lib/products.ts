export type Product = {
  slug: string;
  name: string;
  category: string;
  price: string;
  blurb: string;
  description: string;
  sizes: string[];
  fitNote: string;
  returnWindowDays: number;
};

export const PRODUCTS: Product[] = [
  {
    slug: "firm-ground-match-boots",
    name: "Firm-Ground Match Boots",
    category: "Football",
    price: "KSh 8,500",
    blurb: "Studs built for dry pitches, true to size.",
    description:
      "Conical studs for grip on firm, dry natural turf. Synthetic upper holds its shape after a full season of weekend matches.",
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    fitNote: "Runs true to size. Between sizes? Size up for thicker socks.",
    returnWindowDays: 14,
  },
  {
    slug: "distance-trainer-running-shoes",
    name: "Distance Trainer Running Shoes",
    category: "Running",
    price: "KSh 12,000",
    blurb: "Cushioned for weekly long runs on tarmac.",
    description:
      "Midsole tuned for tarmac and packed dirt over 10km-plus runs. Breathable mesh upper for warm-weather training.",
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    fitNote: "Runs half a size small — most customers order one size up.",
    returnWindowDays: 30,
  },
  {
    slug: "adjustable-dumbbell-set-20kg",
    name: "Adjustable Dumbbell Set, 20kg",
    category: "Gym & Training",
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
    price: "KSh 3,200",
    blurb: "Breathable mesh, printed name and number included.",
    description:
      "Official-cut home jersey in breathable mesh. Name and number printing included at checkout, ready before match day.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    fitNote: "Cut slim. Order one size up for a relaxed fit.",
    returnWindowDays: 7,
  },
  {
    slug: "grip-socks-3-pack",
    name: "Grip Socks, 3-Pack",
    category: "Accessories",
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
    price: "KSh 1,200",
    blurb: "Ankle-strap fit, sized for junior and adult legs.",
    description:
      "Hard-shell front panel with a padded back and ankle strap. Sized separately for junior and adult legs.",
    sizes: ["Junior", "Adult S/M", "Adult L/XL"],
    fitNote: "Measure shin length — sizing runs by leg length, not shoe size.",
    returnWindowDays: 14,
  },
  {
    slug: "goalkeeper-gloves",
    name: "Goalkeeper Gloves",
    category: "Football",
    price: "KSh 2,500",
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
    price: "KSh 3,200",
    blurb: "Same breathable mesh as the home kit, away colourway.",
    description:
      "Official-cut away jersey in breathable mesh. Name and number printing included at checkout, ready before match day.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    fitNote: "Cut slim. Order one size up for a relaxed fit.",
    returnWindowDays: 7,
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
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

export function getProductsByCategory(categoryName: string): Product[] {
  return PRODUCTS.filter((product) => product.category === categoryName);
}

export function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9]/g, ""));
}

export function formatKSh(amount: number): string {
  return `KSh ${amount.toLocaleString("en-KE")}`;
}
