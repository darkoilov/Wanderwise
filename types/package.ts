// types/package.ts
export interface PackagePreview {
    id: string;
    slug: string;
    title: string;
    image: string;
    price: number | null;
    originalPrice: number | null;
    rating: number | null;
}
