import p5 from "p5";

export default class ScreenUI
{
    constructor (private p5: p5) {}

    get width () { return window.innerWidth; }
    get height() { return window.innerHeight; }

    get center() {
        return {
            x: this.width / 2,
            y: this.height / 2
        }
    }
}