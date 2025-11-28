import p5 from 'p5';
import BaseEntity from '../Entities/BaseEntity';
import { IMoveable } from '../interfaces';

export default class Player extends BaseEntity implements IMoveable {

    private yVelocity: number = 0;
    private gravity: number = 0.5;
    private speed: number = 5;
    private ground: number;

    private size: number = 60;

    constructor(p5: p5, x: number, y: number, ground: number) {
        super(p5, x, y);

        this.ground = window.innerHeight -( this.size / 2);
    }

    private onGround (): boolean {
        return this.y >= this.ground;
    }

    moveLeft(): void {
        this.x -= 5;
    }

    moveRight(): void {
        this.x += 5;
    }

    jump(): void {
        if (!this.onGround()) return;

        this.yVelocity = -12;
    }

    update ()
    {
        this.yVelocity += this.gravity;
        this.y += this.yVelocity;

        if (this.y >= this.ground) {
            this.y = this.ground;
            this.yVelocity = 0;
        }
    }

    render ()
    {
        this.update();

        this.p5.fill(255, 0, 0);
        this.p5.stroke(255);
        this.p5.strokeWeight(2);
        this.p5.square(this.x, this.y, this.size);
    }
}