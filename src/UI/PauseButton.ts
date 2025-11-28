import p5 from "p5";
import ButtonComponent from "./Components/ButtonComponent";

export default class PauseButton extends ButtonComponent {

    private hoverProgress: number;

    private static readonly FILL_ANIMATION_SPEED = 0.1;

    constructor(p5: p5, x: number, y: number, width: number, height: number, text: string, onClick: (() => any)) {
        super(p5, x, y, width, height, text, onClick);

        this.hoverProgress = 0;
    }

    public render() {
        if (!this.isShowing) return;

        // Animate hover progress
        if (this.isHover) {
            this.hoverProgress += PauseButton.FILL_ANIMATION_SPEED;
            if (this.hoverProgress > 1) this.hoverProgress = 1;
        } else {
            this.hoverProgress -= PauseButton.FILL_ANIMATION_SPEED;
            if (this.hoverProgress < 0) this.hoverProgress = 0;
        }

        this.p5.push();

        // Draw the button background
        this.p5.fill(170, 206, 237, 75)
        this.p5.rect(this.x, this.y, this.width, this.height);

        // Draw animated hover fill from left
        if (this.hoverProgress > 0) {
            // this.p5.noStroke();
            const fillWidth = this.width * this.hoverProgress;
            this.p5.fill(144, 255, 255); // hover color
            this.p5.rect(this.x, this.y, fillWidth, this.height);
        }

        // Draw text on top
        this.p5.fill(30, 60, 90, 255) 
        this.p5.textAlign("center", "center");
        this.p5.stroke(255)
        this.p5.strokeJoin(this.p5.ROUND);
        this.p5.text(this.text, Math.round(this.x), Math.round(this.y));

        this.p5.pop();
    }

}