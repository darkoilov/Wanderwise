// lib/services/AdminPackageService.ts
import { ObjectId } from "mongodb"
import {
    getPackageCollection,
    ensurePackageIndexes,
    type TravelPackage,
    CATEGORIES,
    DIFFICULTIES,
} from "@/lib/models/Package"
import {clamp, sanitize, slugify, toNumber } from "../utils"

async function uniqueSlugForTitle(title: string) {
    const col = await getPackageCollection()
    const base = slugify(title)
    let slug = base
    let i = 1
    while (await col.findOne({ slug }, { projection: { _id: 1 } })) slug = `${base}-${i++}`
    return slug
}
async function nextOrder() {
    const col = await getPackageCollection()
    const last = await col.find({}, { projection: { order: 1 } }).sort({ order: -1 }).limit(1).next()
    return (last?.order ?? 0) + 1
}

export class AdminPackageService {
    private static async col() {
        await ensurePackageIndexes()
        return getPackageCollection()
    }

    static async createPackage(
        data: Omit<TravelPackage, "_id" | "slug" | "order" | "isVisible" | "createdAt" | "updatedAt"> & {
            price?: number | string
            originalPrice?: number | string | null
            rating?: number | string
            reviews?: number | string
            category?: string
            difficulty?: string
            isVisible?: boolean
            order?: number | string
        }
    ): Promise<TravelPackage> {
        const collection = await this.col()
        const now = new Date()

        const title = sanitize(data.title)
        const slug = await uniqueSlugForTitle(title)
        const category = (CATEGORIES.includes(data.category as any) ? data.category : "standard") as TravelPackage["category"]
        const difficulty = (DIFFICULTIES.includes(data.difficulty as any) ? data.difficulty : "Easy") as TravelPackage["difficulty"]

        const doc: TravelPackage = {
            slug,
            title,
            location: sanitize(data.location),
            duration: sanitize(data.duration),

            price: toNumber(data.price, 0),
            originalPrice: data.originalPrice === "" || data.originalPrice === undefined ? null : toNumber(data.originalPrice, null as any),

            image: sanitize((data as any).image || ""),
            images: Array.isArray(data.images) ? data.images.map(sanitize) : [],

            rating: clamp(toNumber(data.rating, 0), 0, 5),
            reviews: toNumber(data.reviews, 0),

            category,
            difficulty,
            groupSize: data.groupSize ? sanitize(data.groupSize) : "",

            highlights: Array.isArray(data.highlights) ? data.highlights.map(sanitize).filter(Boolean) : [],
            description: sanitize(data.description),
            whyBook: (data as any).whyBook ? sanitize((data as any).whyBook) : undefined,
            included: Array.isArray(data.included)
                ? data.included.map((i) => ({ icon: sanitize(i.icon), title: sanitize(i.title), description: sanitize(i.description) }))
                : [],
            sights: Array.isArray(data.sights) ? data.sights.map(sanitize) : [],

            order: (data as any).order && Number((data as any).order) > 0 ? Number((data as any).order) : await nextOrder(),
            isVisible: (data as any).isVisible !== false,

            createdAt: now,
            updatedAt: now,
        }

        const result = await collection.insertOne(doc)
        return { ...doc, _id: result.insertedId }
    }

    static async updatePackage(id: string, updates: Partial<TravelPackage>): Promise<boolean> {
        const collection = await this.col()
        const _id = new ObjectId(id)
        const $set: any = { updatedAt: new Date() }

        if (updates.title !== undefined) {
            $set.title = sanitize(updates.title)
            $set.slug = await uniqueSlugForTitle($set.title)
        }
        if (updates.location !== undefined) $set.location = sanitize(updates.location)
        if (updates.duration !== undefined) $set.duration = sanitize(updates.duration)
        if (updates.price !== undefined) $set.price = toNumber(updates.price)
        if (updates.originalPrice !== undefined) $set.originalPrice = updates.originalPrice === null ? null : toNumber(updates.originalPrice)
        if ((updates as any).image !== undefined) $set.image = sanitize((updates as any).image)
        if (updates.images !== undefined) $set.images = (updates.images || []).map(sanitize)
        if (updates.rating !== undefined) $set.rating = clamp(toNumber(updates.rating), 0, 5)
        if (updates.reviews !== undefined) $set.reviews = toNumber(updates.reviews)
        if (updates.category !== undefined) $set.category = CATEGORIES.includes(updates.category as any) ? updates.category : "standard"
        if (updates.difficulty !== undefined) $set.difficulty = DIFFICULTIES.includes(updates.difficulty as any) ? updates.difficulty : "Easy"
        if (updates.groupSize !== undefined) $set.groupSize = updates.groupSize ? sanitize(updates.groupSize) : ""
        if (updates.highlights !== undefined) $set.highlights = (updates.highlights || []).map(sanitize).filter(Boolean)
        if (updates.description !== undefined) $set.description = sanitize(updates.description)
        if ((updates as any).whyBook !== undefined) $set.whyBook = sanitize((updates as any).whyBook)
        if (updates.included !== undefined)
            $set.included = (updates.included || []).map((i) => ({ icon: sanitize(i.icon), title: sanitize(i.title), description: sanitize(i.description) }))
        if (updates.sights !== undefined) $set.sights = (updates.sights || []).map(sanitize)
        if ((updates as any).order !== undefined) $set.order = Math.max(1, Math.floor(Number((updates as any).order)))
        if ((updates as any).isVisible !== undefined) $set.isVisible = !!(updates as any).isVisible

        const result = await collection.updateOne({ _id }, { $set })
        return result.modifiedCount > 0
    }

    static async deletePackage(id: string): Promise<boolean> {
        const collection = await this.col()
        const _id = new ObjectId(id)
        const res = await collection.deleteOne({ _id })
        return res.deletedCount > 0
    }

    static async updatePackageOrder(items: Array<{ id: string; order: number }>): Promise<number> {
        const collection = await this.col()
        if (!Array.isArray(items) || !items.length) return 0

        const ops = items.map((x) => ({
            updateOne: {
                filter: { _id: new ObjectId(x.id) },
                update: { $set: { order: Math.max(1, Math.floor(Number(x.order))), updatedAt: new Date() } },
            },
        }))

        const result = await collection.bulkWrite(ops, { ordered: false })
        return result.modifiedCount
    }

    static async togglePackageVisibility(id: string, isVisible: boolean): Promise<boolean> {
        const collection = await this.col()
        const _id = new ObjectId(id)
        const res = await collection.updateOne({ _id }, { $set: { isVisible: !!isVisible, updatedAt: new Date() } })
        return res.modifiedCount > 0
    }
}
