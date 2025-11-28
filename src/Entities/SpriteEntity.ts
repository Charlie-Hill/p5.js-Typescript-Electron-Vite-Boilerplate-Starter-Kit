import p5 from "p5";
import BaseEntity from "./BaseEntity";
import { IScaleableEntity } from "../interfaces";

export default class SpriteEntity extends BaseEntity implements IScaleableEntity {

    protected sprite: p5.Image | null;
    public scale: number;

    constructor (p5: p5, x: number, y: number, sprite: p5.Image | null, scale=1)
    {
        super(p5, x, y);
        this.sprite = sprite ? sprite : null;
        this.scale = scale;
    }

    public setScale(scale: number) {
        this.scale = scale;
    }

    public get getScale(): number {
        return this.scale
    }

    public render() {
        super.render();
    }

}