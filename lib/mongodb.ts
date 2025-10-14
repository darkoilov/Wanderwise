// db.ts
import { MongoClient, type Db } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  const g = global as typeof globalThis & { _mongoClientPromise?: Promise<MongoClient> };
  if (!g._mongoClientPromise) {
    client = new MongoClient(uri, options);
    g._mongoClientPromise = client.connect().then(c => {
      console.log("[MongoDB] Connected (dev)");
      return c;
    });
  }
  clientPromise = g._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect().then(c => {
    console.log("[MongoDB] Connected (prod/serverless container)");
    return c;
  });
}

export default clientPromise;

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  // no per-call log here
  return client.db("wanderwise");
}
