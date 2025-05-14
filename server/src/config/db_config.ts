// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ override: true });
import { MongoClient, ServerApiVersion } from 'mongodb';
import * as mongoDB from "mongodb";
export const collections: { users?: mongoDB.Collection,
                           course?:mongoDB.Collection,
                           stundent?:mongoDB.Collection
                            lecturer?:mongoDB.Collection
                            building?:mongoDB.Collection,
                            timetableEntry?:mongoDB.Collection,
                            timetable?:mongoDB.Collection
                            } = {};
const username = encodeURIComponent(process.env.MONGODB_USER!);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD!);
const cluster = process.env.MONGO_ClUSTER_URL;
const dbName = process.env.MONGODB_DB_NAME;
const options: mongoDB.ConnectOptions = process.env.MONGO_OPTIONS as  mongoDB.ConnectOptions; 


const uri =`mongodb+srv://${username}:${password}@${cluster}/?${options}`;
// const uri = "mongodb+srv://schoolPortal:schoolPortal1@cluster0.p8ocflq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

export async function connectToDatabase() {
  try {
    
  
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const db: mongoDB.Db = client.db(dbName);
    const usersCollection: mongoDB.Collection = db.collection('users');
    const courseCollection: mongoDB.Collection = db.collection('course');
    const studentCollection: mongoDB.Collection = db.collection('student');
    const lecturerCollection: mongoDB.Collection = db.collection('lecturer');
    const buildingCollection: mongoDB.Collection = db.collection('building');
    const timetableEntryCollection:mongoDB.Collection = db.collection('timetable_entry');
    const timetableCollection:mongoDB.Collection = db.collection('timetable');




    collections.users = usersCollection;
    collections.users.createIndex(
      { email: 1 },
      { unique: true }
    );
    collections.course=courseCollection;
    collections.course.createIndex(
      { course_code: 1 },
      { unique: true }
    );


    collections.stundent=studentCollection;
    collections.stundent.createIndex(
      { student_id: 1 },
      { unique: true }
    );
    collections.stundent.aggregate(
      [
        {
          $lookup:
          {
            from:"users",
            foreignField:"user_id",
            as:"user"
          }
        }
      ]
    );

    collections.lecturer=lecturerCollection;
    collections.lecturer.createIndex(
      { lecturer_id: 1 },
      { unique: true }
    );
    collections.lecturer.aggregate(
      [
        {
          $lookup:
          {
            from:"users",
            foreignField:"user_id",
            as:"user"
          }
        }
      ]
    );

    collections.building = buildingCollection;

    collections.timetableEntry= timetableEntryCollection;

    collections.timetable= timetableCollection;





    
    console.log(`Successfully connected to database: ${db.databaseName} and collections: ${usersCollection.collectionName}  ${courseCollection.collectionName}  ${studentCollection.collectionName} ${lecturerCollection.collectionName} ${buildingCollection.collectionName}  ${timetableEntryCollection.collectionName}  ${timetableCollection.collectionName}`);

  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    client.close();
  }

  
}





















