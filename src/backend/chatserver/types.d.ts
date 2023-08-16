type UserID = number;
type ConferenceCategoryID = number;
type ConferenceID = number;
type ConferenceHistoryID = number;

interface room {
    id :  BigInt,
    pr_id : BigInt, 
    pp_id : BigInt, 
    name : string, 
    created_at : string,
}

interface contract   {
    id: BigInt,
    producer_id: BigInt,
    consumer_id: BigInt,
    deposit: Number,
    rental_cost: Number,
    created_at: string,
    rental_at: string,
    return_at: string,
    status: Number,
    contract_path: string,
    producer_sign: string,
    consumer_sign: string,
    account: string,
    productName: string,
    period: Number
  }

interface member {
    id :  BigInt,
    email : string, 
    password : string, 
    name : string, 
    nickname : string, 
    student_id : stirng,
    depart : string,
    ordinal : string
    phone_no : Number,
    image_path : {
        type : String,
        default : null
    },
    created_at : string,
}

interface room_member{
    member_id : BigInt,
    room_id : BigInt 
}

interface chat {
    id : Number,
    room_id : Number,
    member_id : Number,
    text_content : String,
    chat_file_path: {
        type : [String],
        default : []
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
}

interface User {
    id?: UserID;
    department: string;
    position: string;
    name: string;
    member_id: string;
    password: string;
}

interface ConferenceCategory {
    id?: ConferenceCategoryID;
    name: string;
}

interface Conference {
    id?: ConferenceID;
    owner_id: UserID;
    conference_category: ConferenceCategoryID;
    call_start_time: Date;
    call_end_time: Date;
    thumbnail_url: string;
    title: string;
    description: string;
    is_active: boolean;
}

interface UserConference {
    id: number;
    conference_id: ConferenceID;
    member_id: UserID;
}

interface ConferenceHistory {
    id?: ConferenceHistoryID;
    conference_id: ConferenceID;
    member_id: UserID;
    action: -1 | 0 | 1;
    inserted_time: Date;
}
