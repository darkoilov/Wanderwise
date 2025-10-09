import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sanitize = (s: any) =>
    String(s ?? "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()

export const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")

export const toNumber = (v: any, def = 0) => (Number.isFinite(Number(v)) ? Number(v) : def)

export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))

export const formatPrice = (n?: number) =>
    typeof n === "number" ? new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n) : ""
