import p5 from "p5";
import SpriteEntity from "./SpriteEntity";
import { IScaleableEntity } from "../interfaces";

export default class Arrow extends SpriteEntity implements IScaleableEntity
{   
    public scale: number;
 
    protected angle: number;
    protected length: number;

    // TEMP
    private color: string;

    private static readonly HEAD_SIZE = 7;

    constructor (p5: p5, x: number, y: number, angle: number, length: number)
    {
        super(p5, x, y, null);
        this.angle = angle;
        this.length = length;
        this.scale = 1;
        this.color = 'red';
    }

    public setAngle(angle: number)
    {
        this.angle = angle;
    }

    render ()
    {
        this.p5.push();
        this.p5.stroke(this.color);
        this.p5.strokeWeight(3);
        this.p5.fill(this.color);

        // Move to arrow base
        this.p5.translate(this.x, this.y);

        // Rotate to heading
        this.p5.rotate(this.angle);

        this.p5.scale(this.scale);

        // Draw shaft
        this.p5.line(0, 0, this.length, 0);

        // Draw head
        const s = Arrow.HEAD_SIZE;
        this.p5.triangle(this.length, 0, this.length - s, s, this.length - s, -s);

        this.p5.pop();
    }

}