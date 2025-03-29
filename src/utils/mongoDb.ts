
import { toast } from "@/components/ui/use-toast";

// Mock ObjectId implementation for browser
export class ObjectId {
  private value: string;

  constructor(id?: string) {
    this.value = id || this.generateId();
  }

  private generateId(): string {
    // Simple ID generation for mock purposes
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  toString(): string {
    return this.value;
  }

  equals(otherId: ObjectId): boolean {
    return this.value === otherId.value;
  }
}

// In-memory database for browser development
class InMemoryDatabase {
  private static collections: {
    [name: string]: any[];
  } = {
    disasters: [],
    users: []
  };

  // Get a collection by name
  collection(name: string) {
    if (!InMemoryDatabase.collections[name]) {
      InMemoryDatabase.collections[name] = [];
    }

    return {
      // Find documents
      find: (query = {}) => {
        return {
          toArray: () => {
            return Promise.resolve(this.filterDocuments(InMemoryDatabase.collections[name], query));
          }
        };
      },
      
      // Find a single document
      findOne: (query = {}) => {
        const results = this.filterDocuments(InMemoryDatabase.collections[name], query);
        return Promise.resolve(results.length > 0 ? results[0] : null);
      },
      
      // Insert a document
      insertOne: (doc: any) => {
        if (!doc._id) {
          doc._id = new ObjectId();
        }
        doc.createdAt = doc.createdAt || new Date();
        InMemoryDatabase.collections[name].push(doc);
        return Promise.resolve({ insertedId: doc._id });
      },
      
      // Update a document
      updateOne: (query: any, update: any) => {
        const results = this.filterDocuments(InMemoryDatabase.collections[name], query);
        if (results.length > 0) {
          const index = InMemoryDatabase.collections[name].indexOf(results[0]);
          if (update.$set) {
            InMemoryDatabase.collections[name][index] = { 
              ...InMemoryDatabase.collections[name][index], 
              ...update.$set 
            };
          }
          if (update.$unset) {
            Object.keys(update.$unset).forEach(key => {
              delete InMemoryDatabase.collections[name][index][key];
            });
          }
          return Promise.resolve({ modifiedCount: 1 });
        }
        return Promise.resolve({ modifiedCount: 0 });
      }
    };
  }

  // Filter documents based on a simple query
  private filterDocuments(documents: any[], query: any): any[] {
    return documents.filter(doc => {
      for (const key in query) {
        // Handle special MongoDB operators
        if (key === 'email' && typeof query[key] === 'string') {
          if (doc[key] !== query[key]) return false;
        } 
        // Handle date comparison with $gte operator
        else if (key === 'otpCreatedAt' && query[key].$gte) {
          const docDate = doc[key] instanceof Date ? doc[key] : new Date(doc[key]);
          const queryDate = query[key].$gte instanceof Date ? query[key].$gte : new Date(query[key].$gte);
          if (docDate < queryDate) return false;
        }
        // Simple equality for other fields
        else if (typeof query[key] === 'object') {
          // Skip complex queries for this mock implementation
          continue;
        } else if (doc[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });
  }
}

// Create a mock client
const mockClient = {
  connect: () => Promise.resolve(mockClient),
  db: (name: string) => {
    const db = new InMemoryDatabase();
    return { collection: (collName: string) => db.collection(collName) };
  }
};

// Mock client promise that resolves to our mock client
export const clientPromise = Promise.resolve(mockClient);

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
  try {
    const collection = await getDisastersCollection();
    const result = await collection.insertOne(disaster);
    toast({
      title: "Success",
      description: "Disaster information added successfully",
    });
    return result;
  } catch (error) {
    console.error("Error adding disaster:", error);
    toast({
      title: "Error",
      description: "Failed to add disaster information",
      variant: "destructive",
    });
    throw error;
  }
};

// Helper functions for user collection
export const getUsersCollection = async () => {
  const client = await clientPromise;
  const db = client.db("disasterResponseDb");
  return db.collection("users");
};

export const addUser = async (user: any) => {
  try {
    const collection = await getUsersCollection();
    const result = await collection.insertOne(user);
    return result;
  } catch (error) {
    console.error("Error adding user:", error);
    toast({
      title: "Error",
      description: "Failed to add user",
      variant: "destructive",
    });
    throw error;
  }
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
  try {
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
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return false;
  }
};
