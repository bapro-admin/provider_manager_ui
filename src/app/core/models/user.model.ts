export class User {
    id_user: number;
    username: string;
    password: string;
    role: string;
    created_at?: Date;
    updated_at?: Date;

    constructor(data: Partial<User>) {
        this.id_user = data.id_user || 0;
        this.username = data.username || '';
        this.password = data.password || '';
        this.role = data.role || '';
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }
}