import { MongoClient, type Db } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise
  const db = client.db("wanderwise")
  console.log("[MongoDB] Connected to database:", db.databaseName)
  return db
}

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const client = await clientPromise
    await client.db("admin").command({ ping: 1 })
    console.log("[MongoDB] Ping successful")
    return true
  } catch (error) {
    console.error("[MongoDB] Connection failed:", error)
    return false
  }
}


