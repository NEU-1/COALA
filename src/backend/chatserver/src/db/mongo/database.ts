import mongoose, { ConnectOptions, Model } from 'mongoose';

const url = process.env.MONGO_DB_URI;
const options: ConnectOptions = {};

const dbName = process.env.MONGO_DB_DATABASE; // 사용할 데이터베이스의 이름

if (!url) throw new Error('Please check your mongo URL');

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(`${url}/${dbName}`, options);
    console.log('MongoDB connected!');
  } catch (error) {
    console.error(`Error in DB connection: ${error instanceof Error ? error.message : 'unknown error'}`);
    process.exit(1);
  }
};

connectDB();

const chatSchema = new mongoose.Schema({
    id : Number,
    room_id : Number,
    member_id : Number,
    text_content : String,
    chat_file_path: {
        type : [String],
        default : null
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
});

let chat_content: Model<any>;

if (mongoose.models.chat_content) {
  chat_content = mongoose.model('chat_content');
} else {
  chat_content = mongoose.model('chat_content', chatSchema);
}


export default chat_content;