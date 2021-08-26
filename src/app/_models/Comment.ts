import { User } from "./user";

export interface Comment {
    _id: Number;
    body: String;
    user_id: User;
    created_at: Date;
}
