// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { content?: mongoDB.Collection, contact?: mongoDB.Collection } = {}


// Initialize Connection
export async function connectToDatabase() {
  console.log('starting connection')
  dotenv.config();

  console.log('config received', dotenv.config())

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING!);
          
  const response = await client.connect();

  console.log('connection made')

      
  const db: mongoDB.Db = client.db(process.env.DB_NAME);
 
  const contentCollection: mongoDB.Collection = db.collection('content');
  const contactCollection: mongoDB.Collection = db.collection('contact');

collections.content = contentCollection;
collections.contact = contactCollection;
     
       console.log(`Successfully connected to database: ${db.databaseName} and collection: ${contentCollection.collectionName}`);
       console.log(`Successfully connected to database: ${db.databaseName} and collection: ${contactCollection.collectionName}`);

}