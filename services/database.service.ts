// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { content?: mongoDB.Collection } = {}



// Initialize Connection
export async function connectToDatabase() {
  console.log('starting connection')
  dotenv.config();

  console.log('config received', dotenv.config())

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING!);
          
  const response = await client.connect();

  console.log('connection made', response)

      
  const db: mongoDB.Db = client.db(process.env.DB_NAME);
 
  const contentCollection: mongoDB.Collection = db.collection(process.env.CONTENT_COLLECTION_NAME!);

collections.content = contentCollection;
console.log('content', collections.content)
     
       console.log(`Successfully connected to database: ${db.databaseName} and collection: ${contentCollection.collectionName}`);
}