import {MongoClient} from "mongodb";

const url = "mongodb+srv://rohitk93339_db_user:fwr8epJIkkv5KkaJ@cluster0.j1lryhv.mongodb.net/?appName=Cluster0";

const dbName = "todo";
export const collectionName="todo";
const client= new MongoClient(url)
export const connection=async ()=>{

    const connect = await client.connect();
    return await connect.db(dbName)
}
