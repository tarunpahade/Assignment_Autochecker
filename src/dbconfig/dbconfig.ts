import { MongoClient, ObjectId, Timestamp } from "mongodb";
const uri=process.env.MONGODB_URL
const client = new MongoClient(uri!, {
    connectTimeoutMS: 30000, 
  });
 
 const db = client.db("test");
  const Users = db.collection("users");
 export  const Messages = db.collection("messages");
 export  const Assignments = db.collection("assignments");
export const CompleteAssignment=db.collection("completed_assignments");
 

 export interface messages {
  senderEmail: string,
  reciverEmail: string,
  message: string,
  timestamp:number,
 }
 interface messageSchema {
  text: String,
  senderEmail: String,
  timestamp: Number,
}

interface conversation {
  participants: [String], // Array of participant emails
  messages: [messageSchema], // Array of message objects
}
export default Users     
