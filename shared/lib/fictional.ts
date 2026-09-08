/**
 * Fictional Entity Generator — deterministic fake data for demos.
 *
 * Uses a fixed Faker seed per template to generate plausible Lithuanian names,
 * parishes, and addresses. All generated data MUST be verified as fictional
 * per content-policy.md §1.
 *
 * @packageDocumentation
 */

/** Fixed seed per template for deterministic output. */
const TEMPLATE_SEEDS: Record<string, number> = {
  basilica: 42,
  cathedral: 101,
  diocese: 256,
  deaneries: 512,
  "parish-church": 1024,
  "funeral-services": 2048,
  "cemetery-services": 4096,
  "online-store": 8192,
  "vendor-dashboard": 16384,
};

/** Simple seeded PRNG (mulberry32). */
function mulberry32(seed: number): () => number {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FIRST_NAMES = [
  "Jonas",
  "Petras",
  "Antanas",
  "Ona",
  "Marija",
  "Elžbieta",
  "Tomas",
  "Kristina",
];
const LAST_NAMES = [
  "Kazlauskas",
  "Petrauskas",
  "Jankauskas",
  "Stankevičienė",
  "Butkienė",
  "Urbonaitė",
];
const PARISH_NAMES = ["Šv. Kazimiero", "Šv. Onos", "Šv. Jono", "Šv. Marijos", "Šv. Kryžiaus"];
const STREETS = ["Vilniaus g.", "Kauno g.", "Žalgirio g.", "Gedimino pr.", "Laisvės al."];

/** Get the deterministic seed for a template. */
export function getTemplateSeed(slug: string): number {
  return TEMPLATE_SEEDS[slug] ?? 0;
}

/** Generate a fictional person's name. */
export function fictionalName(templateSlug: string): string {
  const rng = mulberry32(getTemplateSeed(templateSlug));
  const first = FIRST_NAMES[Math.floor(rng() * FIRST_NAMES.length)];
  const last = LAST_NAMES[Math.floor(rng() * LAST_NAMES.length)];
  return `${first} ${last}`;
}

/** Generate a fictional parish name. */
export function fictionalParish(templateSlug: string): string {
  const rng = mulberry32(getTemplateSeed(templateSlug) + 1);
  const name = PARISH_NAMES[Math.floor(rng() * PARISH_NAMES.length)];
  return `${name} parapija (demo)`;
}

/** Generate a fictional address. */
export function fictionalAddress(templateSlug: string): string {
  const rng = mulberry32(getTemplateSeed(templateSlug) + 2);
  const street = STREETS[Math.floor(rng() * STREETS.length)];
  const number = Math.floor(rng() * 100) + 1;
  return `${street} ${number}, Vilnius`;
}

/** Disclaimer text for fictional entities. */
export const FICTIONAL_DISCLAIMER = {
  lt: "Visi šioje svetainėje rodomi asmenys, organizacijos ir duomenys yra fiktyvūs.",
  en: "All persons, organisations, and data shown on this website are fictional.",
  ru: "Все лица, организации и данные, показанные на этом сайте, являются вымышленными.",
};
