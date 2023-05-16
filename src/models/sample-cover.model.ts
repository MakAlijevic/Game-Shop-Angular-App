export class SampleCover {
    public height: number;
    public image: string;
    public platforms: string[];
    public thumbnail_image: string;
    public width: number;

    constructor(height: number, image: string, platforms: string[], thumbnail_image: string, width: number) {
        this.height = height;
        this.image = image;
        this.platforms = platforms;
        this.thumbnail_image = thumbnail_image;
        this.width = width;
    }
}