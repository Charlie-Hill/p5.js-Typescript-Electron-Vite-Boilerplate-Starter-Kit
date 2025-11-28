import p5 from "p5"
import { IClickable } from "./../../interfaces";
import BaseUI from "./../BaseUI";

export default class ButtonComponent extends BaseUI implements IClickable {
    protected width: number;
    protected height: number;

    protected text: string;

    protected backgroundColor: Array<number>;
    protected backgroundHoverColor: Array<number>;

    public isHover: boolean;

    private onClick: () => void;

    constructor(p5: p5, x: number, y: number, width: number, height: number, text: string, onClick: (() => any)) {
        super(p5);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.onClick = onClick

        this.text = text;
        this.isHover = false;

        this.backgroundColor = [200, 255,255]
        this.backgroundHoverColor = [0, 255, 0]
    }

    public handleClick (mouseX: number, mouseY: number) {
        if (!this.isShowing) return;
        if (this.isMouseOver(mouseX, mouseY)) {
            this.onClick()
        }        
    }

    public isMouseOver(mouseX: number, mouseY: number): boolean {
        const leftX = this.x - (this.width / 2);
        const rightX = this.x + (this.width / 2);
        const topY = this.y - (this.height / 2);
        const bottomY = this.y + (this.height / 2);

        return (
            (mouseX > leftX) && (mouseX < rightX) && (mouseY > topY) && (mouseY < bottomY)
        );
    }

    public render() {
        if (!this.isShowing) return;

        this.p5.push();
        if (this.isHover) {
            this.p5.fill(this.backgroundHoverColor)
        } else {
            this.p5.fill(this.backgroundColor);
        }
        this.p5.rect(this.x, this.y, this.width, this.height);

        this.p5.fill(255, 255, 0);
        this.p5.textAlign("center")
        this.p5.text(this.text, this.x, this.y + (this.height / 4));
        this.p5.pop();
    }


}