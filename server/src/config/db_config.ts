
import { MongoClient, ServerApiVersion } from 'mongodb';




import * as mongoDB from "mongodb";
export const collections: { users?: mongoDB.Collection } = {};

const uri = "mongodb+srv://schoolPortal:schoolPortal1@cluster0.p8ocflq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


export async function connectToDatabase() {
  try {
    
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const db: mongoDB.Db = client.db("schoolPortal");
    const usersCollection: mongoDB.Collection = db.collection('users');
    collections.users = usersCollection;
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`);

  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
}





















