import { AlternateTitle } from "./alternate-title.model";
import { Genre } from "./genre.model";
import { Platform } from "./platform.model";
import { SampleCover } from "./sample-cover.model";
import { SampleScreenshot } from "./sample-screenshot.model";

export class Game {
    public alternate_titles: AlternateTitle[];
    public description: string;
    public game_id: number;
    public genres: Genre[];
    public moby_score: number;
    public moby_url: string;
    public num_votes: number;
    public official_url: string;
    public platforms: Platform[];
    public sample_cover: SampleCover;
    public sample_screenshot: SampleScreenshot[];
    public title: string;
    public trending: boolean;
    public sale: number;
    public is_console?: boolean;
    public console_featured?: boolean;

    constructor(alternate_titles: AlternateTitle[], description: string, game_id: number, genres: Genre[], moby_score: number, moby_url: string, num_votes: number, official_url: string, platforms: Platform[], sample_cover: SampleCover, sample_screenshot: SampleScreenshot[], title: string, trending: boolean, sale: number, is_console?: boolean, console_featured?: boolean) {
        this.alternate_titles = alternate_titles;
        this.description = description;
        this.game_id = game_id;
        this.genres = genres;
        this.moby_score = moby_score;
        this.moby_url = moby_url;
        this.num_votes = num_votes;
        this.official_url = official_url;
        this.platforms = platforms;
        this.sample_cover = sample_cover;
        this.sample_screenshot = sample_screenshot;
        this.title = title;
        this.trending = trending;
        this.sale = sale;
        this.is_console = is_console;
        this.console_featured = console_featured;
    }
}