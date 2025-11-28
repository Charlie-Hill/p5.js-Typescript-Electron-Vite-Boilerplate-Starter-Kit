import * as p5 from "p5"
import BaseUI from "./BaseUI";

export default class Debug extends BaseUI {
    public x: number = 60;
    public y: number = 50;
    public lines: Array<string>;
    public isShowing: boolean;

    public lastKeyPressed = -1;

    constructor(p5: p5) {
        super(p5);
        this.lines = [];
        this.isShowing = false;
    }

    render () {

        this.p5.fill(255);
        this.p5.stroke(0);
        this.p5.strokeWeight(0);
        this.p5.textAlign('left');
        this.p5.textStyle(this.p5.BOLD);
        this.p5.textSize(10);
        
        this.lines.forEach((l, index: number) => {
            this.renderLine(l, index);
        });
        this.p5.strokeWeight(1);
        
        this.lines = [];
        this.init();
    }

    private init() {
        this.addLine('Frame Rate: ' + Math.round(this.p5.frameRate()));
        this.addLine('Frame Count: ' + this.p5.frameCount)
        this.addLine(`Mouse: x ${this.p5.mouseX}, y ${this.p5.mouseY}`);

        if (this.lastKeyPressed != -1) {
            this.addLine(`Last Key Pressed: ${this.p5.keyCode}`)
        }
    }

    private renderLine(text: string, index: number) {
        this.p5.text(text, this.x, this.y + (index * 25));
    }

    public addLine(text: string) {
        this.lines.push(text);
    }
  
}