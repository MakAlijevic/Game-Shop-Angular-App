export class SampleScreenshot {
    public caption: string;
    public height: number;
    public image: string;
    public thumbnail_image: string;
    public width: number;

    constructor(caption: string, height: number, image: string, thumbnail_image: string, width: number) {
        this.caption = caption;
        this.height = height;
        this.image = image;
        this.thumbnail_image = thumbnail_image;
        this.width = width;
    }
}