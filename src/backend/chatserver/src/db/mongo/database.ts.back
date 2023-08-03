import { MongoClient } from 'mongodb';

const url = process.env.MONGO_DB_URI
const options = {}

if(!url) throw new Error('Please check your mongo URL');
const client = new MongoClient(url, options);


const dbName = process.env.MONGO_DB_DATABASE || 'chat_logs'; // 사용할 데이터베이스의 이름

let db : any;
console.log(url, dbName);
const connectDB = async () => {
    if (db) {
        return db;
    }
    console.log("connect_")
    await client.connect();
    console.log("_end")
    db = client.db(dbName);

    return db;
};

const dbQuery = async (collection : any, query : object ) => {
    console.log(query, collection)
    const _db = await connectDB();
    return _db.collection(collection).find(query).toArray();
};

export default dbQuery;