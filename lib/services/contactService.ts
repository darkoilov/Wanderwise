import { getDatabase } from "@/lib/mongodb"
import type { ObjectId } from "mongodb"

export interface Contact {
  _id?: ObjectId
  name: string
  email: string
  phone: string
  subject: string
  message: string
  inquiryType: string
  status: "new" | "read" | "replied"
  createdAt: Date
  updatedAt: Date
}

export class ContactService {
  private static async getCollection() {
    const db = await getDatabase()
    return db.collection<Contact>("contacts")
  }

  static async createContact(
    contactData: Omit<Contact, "_id" | "status" | "createdAt" | "updatedAt">,
  ): Promise<Contact> {
    try {
      const collection = await this.getCollection()
      const now = new Date()

      const newContact: Contact = {
        ...contactData,
        status: "new",
        createdAt: now,
        updatedAt: now,
      }

      const result = await collection.insertOne(newContact)
      return { ...newContact, _id: result.insertedId }
    } catch (error) {
      console.error("Error creating contact:", error)
      throw new Error("Failed to create contact")
    }
  }

  static async sendContactNotification(contact: Contact): Promise<void> {
    // Email notification logic would go here
    // For now, just log it
    console.log("New contact message received:", {
      name: contact.name,
      email: contact.email,
      subject: contact.subject,
    })
  }
}
