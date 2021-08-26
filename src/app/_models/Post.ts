import { User } from './user';
export interface Post {
    user_id: User;
    name: String;
    body: String;
    created_at: Date;
    comments: Comment;
}
