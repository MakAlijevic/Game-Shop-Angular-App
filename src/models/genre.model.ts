export class Genre {
    public genre_category: string;
    public genre_category_id: number;
    public genre_id: number;
    public genre_name: string;

    constructor(genre_category: string, genre_category_id: number, genre_id: number, genre_name: string) {
        this.genre_category = genre_category;
        this.genre_category_id = genre_category_id;
        this.genre_id = genre_id;
        this.genre_name = genre_name;
    }
}