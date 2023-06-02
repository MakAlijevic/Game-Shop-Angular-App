
export class User {
    public username: string;
    public email: string;
    public password: string;
    public joined: Date;

    constructor(username: string, email: string, password: string, joined: Date) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.joined = joined;
    }
}