export interface AccountUser {
        id: number;
        username: string;
        password: string;
        first_name: string;
        last_name: string;
        email: string;
        age: number;
        isBanned: number;
        isAdmin: number;
        date_created: Date;
}