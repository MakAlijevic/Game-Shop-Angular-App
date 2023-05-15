export class Platform {
    public first_release_date: string;
    public platform_id: number;
    public platform_name: string;

    constructor(first_release_date: string, platform_id: number, platform_name: string) {
        this.first_release_date = first_release_date;
        this.platform_id = platform_id;
        this.platform_name = platform_name;
    }
}