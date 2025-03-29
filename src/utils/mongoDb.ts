
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

// Connection URI - replace with your MongoDB connection string
// In production, use environment variables for the connection string
const uri = "mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let clientPromise: Promise<MongoClient>;

// In development mode, use a global variable so that the value
// is preserved across module reloads caused by HMR (Hot Module Replacement).
if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  if (!global._mongoClientPromise) {
    // @ts-ignore
    global._mongoClientPromise = client.connect();
  }
  // @ts-ignore
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export { clientPromise, ObjectId };

// Helper functions for disaster collection
export const getDisastersCollection = async () => {
  const client = await clientPromise;
  const db = client.db("disasterResponseDb");
  return db.collection("disasters");
};

export const getAllDisasters = async () => {
  const collection = await getDisastersCollection();
  return collection.find({}).toArray();
};

export const addDisaster = async (disaster: any) => {
  const collection = await getDisastersCollection();
  const result = await collection.insertOne(disaster);
  return result;
};

// Helper functions for user collection
export const getUsersCollection = async () => {
  const client = await clientPromise;
  const db = client.db("disasterResponseDb");
  return db.collection("users");
};

export const addUser = async (user: any) => {
  const collection = await getUsersCollection();
  const result = await collection.insertOne(user);
  return result;
};

export const getUserByEmail = async (email: string) => {
  const collection = await getUsersCollection();
  return collection.findOne({ email });
};

export const updateUserOtp = async (email: string, otp: string) => {
  const collection = await getUsersCollection();
  return collection.updateOne(
    { email },
    { $set: { otp, otpCreatedAt: new Date() } }
  );
};

export const verifyUserOtp = async (email: string, otp: string) => {
  const collection = await getUsersCollection();
  const user = await collection.findOne({ 
    email, 
    otp,
    otpCreatedAt: { $gte: new Date(Date.now() - 10 * 60 * 1000) } // OTP valid for 10 minutes
  });
  
  if (user) {
    await collection.updateOne(
      { email },
      { $set: { verified: true }, $unset: { otp: "", otpCreatedAt: "" } }
    );
    return true;
  }
  
  return false;
};
