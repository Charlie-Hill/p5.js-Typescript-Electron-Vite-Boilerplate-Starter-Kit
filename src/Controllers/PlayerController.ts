import p5 from "p5";
import { IMoveable } from "../interfaces";

export default class PlayerController {

    private square: IMoveable & { update: () => void; render: () => void; };

    constructor (square: IMoveable & { update: () => void; render: () => void; })
    {
        this.square = square;
    }

    public handleInput(p: p5)
    {
        if (p.keyIsDown(p.LEFT_ARROW)) {
            this.square.moveLeft();
        }
        if (p.keyIsDown(p.RIGHT_ARROW)) {
            this.square.moveRight();
        }
    }

    public update(): void {
        this.square.update();
    }

    public render(): void {
        this.square.render();
    }

}