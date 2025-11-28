import p5 from "p5"
import BaseUI from "../BaseUI";

export default class LabelComponent extends BaseUI {
    protected text: string

    constructor(p5: p5, x: number, y: number, text: string) {
        super(p5);
        this.x = x;
        this.y = y;
        this.text = text;
    }

    public render() {
        if (!this.isShowing) return;
 
        this.p5.push();
        this.p5.fill(255);
        this.p5.textAlign("center", "center");
        this.p5.text(this.text, this.x, this.y);
        this.p5.pop();
    }
}