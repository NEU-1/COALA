type UserID = number;
type ConferenceCategoryID = number;
type ConferenceID = number;
type ConferenceHistoryID = number;

interface room {
    id :  BigInt,
    member_id : BigInt, 
    pr_id : BigInt, 
    pp_id : BigInt, 
    name : string, 
    created_at : string,
}

interface member {
    id :  BigInt,
    member_id : BigInt, 
    pr_id : BigInt, 
    pp_id : BigInt, 
    name : string, 
    created_at : string,
}

interface chat {
    id : BigInt,
    room_id : BigInt,
    member_id : BigInt,
    text_content : Text,
    file_path : Array[string]
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
