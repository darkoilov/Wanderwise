// lib/validation/user.ts
import { z } from "zod"

export const updateProfileSchema = z.object({
    name: z.string().min(1).max(120).optional(),
    firstName: z.string().max(60).optional(),
    lastName: z.string().max(60).optional(),
    phone: z.string().max(40).optional(),
    bio: z.string().max(1000).optional(),
    image: z.string().url().optional(),
})

export const updatePreferencesSchema = z.object({
    currency: z.enum(["EUR", "USD", "GBP", "JPY"]).optional(),
    language: z.enum(["en", "es", "fr", "de"]).optional(),
    emailNotifications: z.boolean().optional(),
    smsNotifications: z.boolean().optional(),
    marketingEmails: z.boolean().optional(),

    // optional discovery prefs you had
    interests: z.array(z.string()).optional(),
    budget: z.string().optional(),
    travelStyle: z.string().optional(),
})

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(8),
})

export const wishlistSchema = z.object({
    packageId: z.string().min(1),
})
