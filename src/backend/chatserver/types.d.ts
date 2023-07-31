type UserID = number;
type ConferenceCategoryID = number;
type ConferenceID = number;
type ConferenceHistoryID = number;

interface User {
    id?: UserID;
    department: string;
    position: string;
    name: string;
    user_id: string;
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
    user_id: UserID;
}

interface ConferenceHistory {
    id?: ConferenceHistoryID;
    conference_id: ConferenceID;
    user_id: UserID;
    action: -1 | 0 | 1;
    inserted_time: Date;
}
