// import type { ObjectId } from "mongodb"
//
// export interface User {
//   _id?: ObjectId
//   email: string
//   name: string
//   image?: string
//   provider: "google" | "email"
//   providerId?: string
//   emailVerified?: Date
//   role: "user" | "admin"
//   preferences?: {
//     interests: string[]
//     budget: string
//     travelStyle: string
//   }
//   createdAt: Date
//   updatedAt: Date
// }
//
// export interface UserSession {
//   id: string
//   email: string
//   name: string
//   image?: string
//   role: string
// }




// lib/models/User.ts
import type { ObjectId } from "mongodb"

export type AuthProvider = "google" | "credentials"
export type UserRole = "user" | "admin"
export type CurrencyCode = "EUR" | "USD" | "GBP" | "JPY"
export type LanguageCode = "en" | "es" | "fr" | "de"

export interface User {
  _id?: ObjectId
  email: string
  name: string
  image?: string

  // auth
  provider: AuthProvider
  providerId?: string
  passwordHash?: string
  emailVerified?: Date
  role: UserRole

  // profile
  firstName?: string
  lastName?: string
  phone?: string
  bio?: string

  // preferences
  preferences?: {
    currency?: CurrencyCode
    language?: LanguageCode
    emailNotifications?: boolean
    smsNotifications?: boolean
    marketingEmails?: boolean
    interests?: string[]
    budget?: string
    travelStyle?: string
  }

  // simple relation
  wishlist?: ObjectId[]

  createdAt: Date
  updatedAt: Date
}

export interface UserSession {
  id: string
  email: string
  name: string
  image?: string
  role: UserRole
}
