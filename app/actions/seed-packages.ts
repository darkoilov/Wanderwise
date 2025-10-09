"use server";

import { seedStaticPackages } from "@/lib/services/seedPackages";
import { getPackageCollection } from "@/lib/models/Package";
import { revalidatePath } from "next/cache";

// 🔐 Optional: set a secret in .env (e.g. SEED_SECRET="supersecret")
const REQUIRE_SECRET = !!process.env.SEED_SECRET;

type RawPackage = Parameters<typeof seedStaticPackages>[0][number];

// ---- your static array here (or import from a file) ----
const packages: RawPackage[] = [
    {
        title: "Discover Sardinia – Your Tailored Escape",
        location: "Sardinia, Italy",
        duration: "10 days",
        price: "€1500",
        originalPrice: "€1800",
        image: "/sardinia-turquoise-beach.png",
        rating: 4.9,
        reviews: 87,
        category: "Beach",
        difficulty: "Easy",
        groupSize: "2-8 people",
        highlights: ["Flight & Transfers", "Custom Accommodation", "Personalized Route", "Insider Tips"],
        description:
            "Fall in love with Sardinia's turquoise beaches, mountain serenity, and charming coastal villages. This trip is designed just for you with handcrafted experiences beyond tourist maps.",
        includes: [
            "Round-trip flights & transfers",
            "Accommodation of your choice",
            "Personalized route plan",
            "Activities & insider tips",
            "Restaurant recommendations",
        ],
    },
    {
        title: "Escape to Mallorca – Your Dream Trip",
        location: "Mallorca, Spain",
        duration: "10 days",
        price: "€1200",
        originalPrice: "€1500",
        image: "/mallorca-golden-beach-cliffs.png",
        rating: 4.8,
        reviews: 124,
        category: "Beach",
        difficulty: "Easy",
        groupSize: "2-10 people",
        highlights: ["Golden Beaches", "Tramuntana Mountains", "Hidden Gems", "Custom Route"],
        description:
            "Mallorca isn't just a destination — it's a feeling. Golden beaches, dramatic cliffs, vibrant villages, and unforgettable sunsets tailored to your adventure or relaxation needs.",
        includes: [
            "Flights & transfers",
            "Accommodation choice",
            "Custom route plan",
            "Activities & hidden gems",
            "Restaurant recommendations",
        ],
    },
    {
        title: "Escape to Porto – City & Wine Retreat",
        location: "Porto, Portugal",
        duration: "7-10 days",
        price: "€800",
        originalPrice: "€1000",
        image: "/porto-riverside-azulejo-tiles.png",
        rating: 4.9,
        reviews: 156,
        category: "Cultural",
        difficulty: "Easy",
        groupSize: "2-8 people",
        highlights: ["Wine Tastings", "Douro Valley", "Historic Streets", "Riverside Cafés"],
        description:
            "Porto isn't just a city — it's a mood. Cobblestone streets, azulejo-tiled facades, riverside cafés, and aged port wine. Perfect for romance, culture, and culinary delights.",
        includes: [
            "Round-trip flights & transfers",
            "Boutique accommodation",
            "Custom itinerary planning",
            "Exclusive experiences",
            "Dining recommendations",
        ],
    },
    {
        title: "Explore South Africa – Tailored Adventure",
        location: "Cape Town & Kruger, South Africa",
        duration: "14-20 days",
        price: "€1800",
        originalPrice: "€2200",
        image: "/south-africa-safari-table-mountain.png",
        rating: 5.0,
        reviews: 67,
        category: "Adventure",
        difficulty: "Moderate",
        groupSize: "2-8 people",
        highlights: ["Wild Safaris", "Wine Country", "Table Mountain", "Garden Route"],
        description:
            "From wild safaris to wine country, coastal drives to vibrant cities — South Africa is a world in one country. Every moment designed to thrill, inspire, and connect.",
        includes: [
            "Flights & transfers",
            "Accommodation choices",
            "Custom route planning",
            "Safari drives & activities",
            "Dining & nightlife recommendations",
        ],
    },
    {
        title: "Mediterranean Magic in Rhodes",
        location: "Rhodes, Greece",
        duration: "7-10 days",
        price: "€1000",
        originalPrice: "€1300",
        image: "/rhodes-ancient-ruins-turquoise-bay.png",
        rating: 4.8,
        reviews: 98,
        category: "Cultural",
        difficulty: "Easy",
        groupSize: "2-10 people",
        highlights: ["Ancient Ruins", "Turquoise Bays", "Old Town", "Hidden Coves"],
        description:
            "From ancient ruins to turquoise bays, cliffside hikes to charming villages — Rhodes is a mosaic of history, nature, and adventure crafted around your passions.",
        includes: [
            "Round-trip flights & transfers",
            "Accommodation options",
            "Custom route plan",
            "Activities & insider tips",
            "Restaurant recommendations",
        ],
    },
];

// A tiny “migration flag” in Mongo so the action is truly one-time.
async function markSeedIfNeeded() {
    const col = await getPackageCollection();
    const meta = col.db.collection("packages");
    const existing = await meta.findOne<{ done: boolean }>({ _id: "seed:packages" });
    if (existing?.done) return false;

    // If two calls race, only one succeeds to insert done:true
    const res = await meta.updateOne(
        { _id: "seed:packages", done: { $ne: true } },
        { $set: { done: true, ranAt: new Date() } },
        { upsert: true }
    );

    // If matchedCount === 0 AND upsertedCount === 0, someone else beat us to it.
    return res.matchedCount > 0 || res.upsertedCount > 0;
}

export async function seedPackagesAction(secret?: string) {
    if (REQUIRE_SECRET && secret !== process.env.SEED_SECRET) {
        throw new Error("Forbidden: bad secret");
    }

    const allowed = await markSeedIfNeeded();
    if (!allowed) {
        return { success: true, alreadySeeded: true };
    }

    const result = await seedStaticPackages(packages);
    // Optional: revalidate any pages that list packages
    revalidatePath("/"); // adjust paths as needed
    return { success: true, alreadySeeded: false, ...result };
}
