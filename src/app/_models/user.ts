export interface User {
    _id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    mobile?: string;
    created_at: Date;
}
