// !!!!!!!!!!!!!!!!!!!!!!!!!!! DODAVANJE DUMMY DATA VO DATABASE

"use server";

import { ObjectId } from "mongodb";
import { ensurePackageIndexes, getPackageCollection, type TravelPackage, type IncludedItem, CATEGORIES, DIFFICULTIES } from "@/lib/models/Package";

// ---- helpers ----
const slugify = (s: string) =>
    s
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

const parsePrice = (s: string | number | null | undefined): number => {
    if (typeof s === "number") return s;
    if (!s) return 0;
    // strip currency & thousand separators
    const n = s.replace(/[^\d.,-]/g, "").replace(/\.(?=\d{3}\b)/g, "");
    const val = Number(n.replace(",", ".")); // "1,500" -> 1.5 (EU), but we removed thousand dots above
    return Number.isFinite(val) ? val : 0;
};

// very safe category mapping (fallback "standard")
const mapCategory = (raw: string | undefined): TravelPackage["category"] => {
    if (!raw) return "standard";
    const v = raw.toLowerCase();
    if (/(beach|sea|coast)/.test(v)) return "standard";
    if (/(culture|cultural|city|heritage)/.test(v)) return "featured";
    if (/(adventure|safari|hike|trek)/.test(v)) return "special";
    if (/(deal|last|minute|promo)/.test(v)) return "lastminute";
    return "standard";
};

const mapDifficulty = (raw: string | undefined): TravelPackage["difficulty"] => {
    const allowed = new Set<string>(DIFFICULTIES as unknown as string[]);
    if (raw && allowed.has(raw)) return raw as TravelPackage["difficulty"];
    // normalize common inputs
    const v = (raw || "").toLowerCase();
    if (/easy/.test(v)) return "Easy";
    if (/mod|medium/.test(v)) return "Moderate";
    if (/hard|challeng/.test(v)) return "Challenging";
    return "Easy";
};

const toIncludedItems = (arr: string[] | undefined): IncludedItem[] =>
    (arr ?? []).map((t) => ({
        icon: "check-circle", // generic icon; change if you have a design system icon set
        title: t,
        description: "",
    }));

// ---- the normalizer ----
type RawPackage = {
    id?: number;
    title: string;
    location: string;
    duration: string;
    price: string | number;
    originalPrice?: string | number;
    image: string;
    images?: string[];
    rating: number;
    reviews: number;
    category?: string;       // your static data has strings like "Beach"
    difficulty?: string;     // "Easy", etc.
    groupSize?: string;
    highlights?: string[];
    description: string;
    includes?: string[];     // static string list -> will become 'included'
    sights?: string[];
    whyBook?: string;
    order?: number;
    isVisible?: boolean;
};

const normalize = (raw: RawPackage, index: number): Omit<TravelPackage, "_id" | "createdAt" | "updatedAt"> & { priceNumeric: number } => {
    const price = parsePrice(raw.price);
    const originalPrice = raw.originalPrice != null ? parsePrice(raw.originalPrice as any) : null;

    const slug = slugify(raw.title);

    const images = Array.isArray(raw.images) && raw.images.length ? raw.images : [raw.image];

    const category = mapCategory(raw.category);
    const difficulty = mapDifficulty(raw.difficulty);

    // clamp rating to 0..5 just in case
    const rating = Math.max(0, Math.min(5, Number(raw.rating) || 0));

    return {
        slug,
        title: raw.title,
        location: raw.location,
        duration: raw.duration,

        price,
        originalPrice: originalPrice ?? null,

        image: raw.image,
        images,

        rating,
        reviews: Number(raw.reviews) || 0,

        category,
        difficulty,
        groupSize: raw.groupSize,

        highlights: raw.highlights ?? [],
        description: raw.description,
        whyBook: raw.whyBook,
        included: toIncludedItems(raw.includes),
        sights: raw.sights ?? [],

        order: raw.order ?? index + 1,
        isVisible: raw.isVisible ?? true,

        // NOTE: not part of TS interface, but your query uses it.
        // Keeping it for compatibility with getAllPackages() price filter.
        priceNumeric: price,
    };
};

// ---- the seeder (idempotent) ----
export async function seedStaticPackages(staticPackages: RawPackage[]) {
    const col = await getPackageCollection();
    await ensurePackageIndexes();

    const now = new Date();
    let inserted = 0;
    let updated = 0;
    const results: { slug: string; upsertedId?: string }[] = [];

    for (let i = 0; i < staticPackages.length; i++) {
        const normalized = normalize(staticPackages[i], i);

        const res = await col.updateOne(
            { slug: normalized.slug },
            {
                $setOnInsert: { createdAt: now },
                $set: { ...normalized, updatedAt: now },
            },
            { upsert: true },
        );

        if (res.upsertedId) {
            inserted++;
            results.push({ slug: normalized.slug, upsertedId: String(res.upsertedId._id ?? res.upsertedId) });
        } else if (res.modifiedCount > 0) {
            updated++;
            results.push({ slug: normalized.slug });
        }
    }

    return {
        success: true,
        inserted,
        updated,
        totalProcessed: staticPackages.length,
        items: results,
    };
}
