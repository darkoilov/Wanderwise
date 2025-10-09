import { z } from "zod"

const EnvSchema = z.object({
    MONGODB_URI: z.string().url(),
    NEXT_PUBLIC_CLOUDINARY_CLOUD: z.string().min(1),
    NEXT_PUBLIC_CLOUDINARY_PRESET: z.string().min(1),
    // Optional: AUTH_SECRET: z.string().min(1).optional(),
})

export type Env = z.infer<typeof EnvSchema>

export const env: Env = EnvSchema.parse({
    MONGODB_URI: process.env.MONGODB_URI,
    NEXT_PUBLIC_CLOUDINARY_CLOUD: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD,
    NEXT_PUBLIC_CLOUDINARY_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
})
