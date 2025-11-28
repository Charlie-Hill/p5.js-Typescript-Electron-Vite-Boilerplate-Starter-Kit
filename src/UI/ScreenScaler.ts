import p5 from "p5";
import Point2D from "../Class/Point2D";

export default class ScreenScaler {

    private width: number;
    private height: number;

    constructor (private p5: p5)
    {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.update();

        window.addEventListener('resize', () => this.update())
    }

    update () {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }

    getWidth (fraction: number) {
        return this.width * fraction;
    }

    getHeight (fraction: number) {
        return this.height * fraction;
    }

    getCenter (): Point2D {
        return new Point2D(this.width / 2, this.height / 2);
    }

}