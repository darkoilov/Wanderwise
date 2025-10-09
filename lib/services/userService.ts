// import { getDatabase } from "@/lib/mongodb"
// import type { User } from "@/lib/models/User"
// import { ObjectId } from "mongodb"
//
// export class UserService {
//   private static async getCollection() {
//     const db = await getDatabase()
//     return db.collection<User>("users")
//   }
//
//   static async createUser(userData: Omit<User, "_id" | "createdAt" | "updatedAt">): Promise<User> {
//     try {
//       const collection = await this.getCollection()
//       const now = new Date()
//
//       const newUser: User = {
//         ...userData,
//         role: "user",
//         createdAt: now,
//         updatedAt: now,
//       }
//
//       const result = await collection.insertOne(newUser)
//       return { ...newUser, _id: result.insertedId }
//     } catch (error) {
//       console.error("Error creating user:", error)
//       throw new Error("Failed to create user")
//     }
//   }
//
//   static async getUserByEmail(email: string): Promise<User | null> {
//     try {
//       const collection = await this.getCollection()
//       const user = await collection.findOne({ email })
//       return user
//     } catch (error) {
//       console.error("Error fetching user by email:", error)
//       throw new Error("Failed to fetch user")
//     }
//   }
//
//   static async getUserById(id: string): Promise<User | null> {
//     try {
//       const collection = await this.getCollection()
//       const user = await collection.findOne({ _id: new ObjectId(id) })
//       return user
//     } catch (error) {
//       console.error("Error fetching user by ID:", error)
//       throw new Error("Failed to fetch user")
//     }
//   }
//
//   static async updateUser(id: string, updates: Partial<User>): Promise<boolean> {
//     try {
//       const collection = await this.getCollection()
//       const result = await collection.updateOne(
//         { _id: new ObjectId(id) },
//         {
//           $set: {
//             ...updates,
//             updatedAt: new Date(),
//           },
//         },
//       )
//
//       return result.modifiedCount > 0
//     } catch (error) {
//       console.error("Error updating user:", error)
//       throw new Error("Failed to update user")
//     }
//   }
//
//   static async findOrCreateUser(userData: {
//     email: string
//     name: string
//     image?: string
//     provider: "google" | "email"
//     providerId?: string
//   }): Promise<User> {
//     try {
//       let user = await this.getUserByEmail(userData.email)
//
//       if (!user) {
//         user = await this.createUser(userData)
//       } else {
//         // Update user info if needed
//         const updates: Partial<User> = {}
//         if (user.name !== userData.name) updates.name = userData.name
//         if (user.image !== userData.image) updates.image = userData.image
//
//         if (Object.keys(updates).length > 0) {
//           await this.updateUser(user._id!.toString(), updates)
//           user = { ...user, ...updates }
//         }
//       }
//
//       return user
//     } catch (error) {
//       console.error("Error finding or creating user:", error)
//       throw new Error("Failed to process user")
//     }
//   }
// }



// lib/services/userService.ts
import { getDatabase } from "@/lib/mongodb"
import type { User } from "@/lib/models/User"
import { ObjectId } from "mongodb"
import bcrypt from "bcryptjs"

export class UserService {
  private static async getCollection() {
    const db = await getDatabase()
    return db.collection<User>("users")
  }

  // ---------- Core CRUD ----------

  static async updateProfile(
      userId: string,
      input: {
        firstName?: string
        lastName?: string
        phone?: string
        bio?: string
        image?: string
      },
  ) {
    return this.updateUser(userId, {
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone,
      bio: input.bio,
      image: input.image,
    })
  }


  static async createUser(
      userData: Omit<User, "_id" | "createdAt" | "updatedAt" | "role" | "wishlist">,
  ): Promise<User> {
    const col = await this.getCollection()
    const now = new Date()

    const newUser: User = {
      ...userData,
      role: "user",
      wishlist: [],
      preferences: userData.preferences ?? {
        currency: "EUR",
        language: "en",
        emailNotifications: true,
        smsNotifications: false,
        marketingEmails: false,
      },
      createdAt: now,
      updatedAt: now,
    }

    const res = await col.insertOne(newUser)
    return { ...newUser, _id: res.insertedId }
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const col = await this.getCollection()
    return col.findOne({ email })
  }

  static async getUserById(id: string): Promise<User | null> {
    const col = await this.getCollection()
    return col.findOne({ _id: new ObjectId(id) })
  }

  static async updateUser(id: string, updates: Partial<User>): Promise<boolean> {
    const col = await this.getCollection()
    // Guard: password changes must use changePassword()
    // Guard: provider/providerId should not be arbitrarily changed here
    const { passwordHash, provider, providerId, ...safe } = updates as any

    const res = await col.updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...safe, updatedAt: new Date() } },
    )
    return res.modifiedCount > 0
  }

  // ---------- Auth helpers ----------

  static async findOrCreateUser(userData: {
    email: string
    name: string
    image?: string
    provider: "google" | "credentials"
    providerId?: string
    passwordHash?: string // only for credentials
  }): Promise<User> {
    const col = await this.getCollection()
    let user = await col.findOne({ email: userData.email })

    if (!user) {
      user = await this.createUser({
        email: userData.email,
        name: userData.name,
        image: userData.image,
        provider: userData.provider,
        providerId: userData.providerId,
        passwordHash: userData.passwordHash,
      } as any)
      return user
    }

    // Update name/image if changed
    const updates: Partial<User> = {}
    if (user.name !== userData.name && userData.name) updates.name = userData.name
    if (user.image !== userData.image && userData.image) updates.image = userData.image

    if (Object.keys(updates).length) {
      await this.updateUser(user._id!.toString(), updates)
      user = { ...user, ...updates }
    }
    return user
  }

  static async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const col = await this.getCollection()
    const user = await this.getUserById(userId)
    if (!user) throw new Error("User not found")
    if (user.provider !== "credentials") throw new Error("Password managed by external provider")
    if (!user.passwordHash) throw new Error("No password set")

    const ok = await bcrypt.compare(currentPassword, user.passwordHash)
    if (!ok) throw new Error("Current password is incorrect")

    const newHash = await bcrypt.hash(newPassword, 12)
    await col.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { passwordHash: newHash, updatedAt: new Date() } },
    )
    return true
  }

  // ---------- Preferences ----------

  static async updatePreferences(
      userId: string,
      prefs: NonNullable<User["preferences"]>,
  ): Promise<boolean> {
    const col = await this.getCollection()
    const res = await col.updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: {
            "preferences.currency": prefs.currency,
            "preferences.language": prefs.language,
            "preferences.emailNotifications": prefs.emailNotifications,
            "preferences.smsNotifications": prefs.smsNotifications,
            "preferences.marketingEmails": prefs.marketingEmails,
            "preferences.interests": prefs.interests,
            "preferences.budget": prefs.budget,
            "preferences.travelStyle": prefs.travelStyle,
            updatedAt: new Date(),
          },
        },
    )
    return res.modifiedCount > 0
  }

  // ---------- Wishlist ----------

  static async getWishlist(userId: string) {
    const user = await this.getUserById(userId)
    return user?.wishlist ?? []
  }

  static async addToWishlist(userId: string, packageId: string) {
    const col = await this.getCollection()
    await col.updateOne(
        { _id: new ObjectId(userId) },
        { $addToSet: { wishlist: new ObjectId(packageId) }, $set: { updatedAt: new Date() } },
    )
    return true
  }

  static async removeFromWishlist(userId: string, packageId: string) {
    const col = await this.getCollection()
    await col.updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { wishlist: new ObjectId(packageId) }, $set: { updatedAt: new Date() } },
    )
    return true
  }

  static async setPasswordWithoutCurrent(userId: string, newPassword: string) {
    const col = await this.getCollection()
    const saltRounds = Number(process.env.BCRYPT_COST ?? 12)
    const newHash = await bcrypt.hash(newPassword, saltRounds)

    await col.updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: {
            passwordHash: newHash,
            provider: "credentials",
            updatedAt: new Date(),
          },
        },
    )

    return true
  }

}
