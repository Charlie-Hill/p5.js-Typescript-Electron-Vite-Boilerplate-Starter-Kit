import p5 from "p5";
import { AssetCatalogue } from "../constants";

export default class AssetLoader
{
    private p5: p5;
    private assets: Map<string, p5.Image> = new Map();

    constructor (p5: p5)
    {
        this.p5 = p5;
    }

    public async loadAllAssets(): Promise<void> {
        const imagePromises: Promise<void>[] = [];

        await Promise.all(imagePromises);
    }

    private loadImageAsync(key: string, path: string, callback?: () => void): Promise<void> {
        if (this.assets.has(key)) {
            if (callback) callback();
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            this.p5.loadImage(
                path,
                (img: p5.Image) => {
                    this.assets.set(key, img);
                    if (callback) callback();
                    resolve();
                },
                (err: any) => reject(err)
            );
        });
    }

    public getImage(key: string): p5.Image {
        return this.assets.get(key)!;
    }

    public has(key: string): boolean {
        return this.assets.has(key);
    }
}