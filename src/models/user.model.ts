
export class User {
    public id: number;
    public username: string;
    public email: string;
    public password: string;
    public joined: string;

    constructor(id: number, username: string, email: string, password: string, joined: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.joined = joined;
    }
}