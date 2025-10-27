// app/admin/packages/form-shared.ts
export type Category = "standard" | "featured" | "special" | "lastminute"

export type PackageFormValues = {
    title: string
    location: string
    duration: string
    price: string
    originalPrice: string
    image: string
    rating: string
    reviews: string
    category: Category
    description: string
    highlights: string[]
    included: string[]
    difficulty: "Easy" | "Moderate" | "Challenging"
    groupSize: string
    order: number
    isSeasonal: boolean
    isVisible: boolean
}

export const initialFormValues: PackageFormValues = {
    title: "",
    location: "",
    duration: "",
    price: "",
    originalPrice: "",
    image: "",
    rating: "4.5",
    reviews: "",
    category: "standard",
    description: "",
    highlights: [""],
    included: [""],
    difficulty: "Easy",
    groupSize: "",
    order: 1,
    isSeasonal: false,
    isVisible: true,
}

export function toNumberOrEmpty(v: string): number | undefined {
    const n = Number(v)
    return Number.isFinite(n) ? n : undefined
}

export function compactStringArray(arr: string[]) {
    return arr.map((s) => s.trim()).filter(Boolean)
}

export function toPackagePayload(f: PackageFormValues) {
    return {
        title: f.title.trim(),
        location: f.location.trim(),
        duration: f.duration.trim(),
        price: toNumberOrEmpty(f.price),
        originalPrice: f.originalPrice === "" ? undefined : toNumberOrEmpty(f.originalPrice),
        image: f.image.trim(),
        rating: toNumberOrEmpty(f.rating),
        reviews: toNumberOrEmpty(f.reviews),
        category: f.category,
        description: f.description.trim(),
        highlights: compactStringArray(f.highlights),
        included: compactStringArray(f.included),
        difficulty: f.difficulty,
        groupSize: f.groupSize.trim(),
        order: f.order || 1,
        isSeasonal: !!f.isSeasonal,
        isVisible: !!f.isVisible,
    }
}

export function validateRequired(p: ReturnType<typeof toPackagePayload>): string | null {
    if (
        !p.title ||
        !p.location ||
        !p.duration ||
        !p.price ||
        !p.image ||
        p.rating == null ||
        p.rating > 5 ||
        p.rating < 0 ||
        p.reviews == null
    ) {
        return "Please fill all required fields correctly."
    }
    return null
}
