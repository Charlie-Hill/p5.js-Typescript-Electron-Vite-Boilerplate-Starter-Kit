import * as p5 from "p5"

import BaseUI from "./BaseUI"
import Point2D from "../Class/Point2D";
import ButtonComponent from "./Components/ButtonComponent";
import { hexToRGB } from "../Utils/Colors";
import BaseEntity from "../Entities/BaseEntity";
import PauseButton from "./PauseButton";
import ScreenScaler from "./ScreenScaler";
import WindowUI from "./WindowUI";
import ScreenUI from "./ScreenUI";
import LabelComponent from "./Components/LabelComponent";

const DARK_PERIWINKLE = hexToRGB('#575fcf');

enum PauseMenuState {
    MAIN_OPTIONS,
    CONFIRM_EXIT
}

export default class PauseUI extends WindowUI 
{
    protected scaler: ScreenScaler;

    public exitButton: ButtonComponent;
    public resumeButton: ButtonComponent;

    public okButton: ButtonComponent;
    public backButton: ButtonComponent;
    private areYouSureLabel: LabelComponent;

    private onResumeClick() {};

    private backgroundParticles: Array<BackgroundParticle> = [];
    private floatOffset = 0;

    protected currentMenuState: PauseMenuState = PauseMenuState.MAIN_OPTIONS;

    constructor(p5: p5, screen: ScreenUI, onResumeClick: () => void){
        super(p5, screen);
        this.scaler = new ScreenScaler(p5);

        this.onResumeClick = onResumeClick;

        for (let i=0; i < 150; i++) {
            this.backgroundParticles.push(new BackgroundParticle(p5, screen));

            setInterval(() => { this.floatOffset += 0.02 }, 1000/60);
        }

        // TODO: Tidy this up
        const buttonWidth = 350;
        const buttonHeight = 30;

        this.resumeButton = new PauseButton(this.p5, 0, 0, buttonWidth, buttonHeight, "RESUME", this.onResumeClick);

        this.exitButton = new PauseButton(this.p5, 0, 0, buttonWidth, buttonHeight, "EXIT", () => this.handleShowConfirm(true));

        this.okButton = new PauseButton(this.p5, 0, 0, buttonWidth / 2, buttonHeight, "YES", () => this.handleExitClick());

        this.backButton = new PauseButton(this.p5, 0, 0, buttonWidth / 2, buttonHeight, "BACK", () => { {
            this.setPauseMenuState(PauseMenuState.MAIN_OPTIONS);
        } });

        this.areYouSureLabel = new LabelComponent(this.p5, this.screen.center.x, this.screen.center.y, "Are you sure you want to exit?");

        this.calculateLayout();
    }

    handleShowConfirm(show: boolean): any {
        if (show) {
            this.setPauseMenuState(PauseMenuState.CONFIRM_EXIT);
        } else {
            this.setPauseMenuState(PauseMenuState.MAIN_OPTIONS);
        }
    }

    handleExitClick = () => window.api.quitApp();

    setPauseMenuState = (state: PauseMenuState) => {
        this.currentMenuState = state;
    }

    private calculateLayout () {
        const middle = this.screen.center;
        const buttonWidth = 350;
        const buttonHeight = 30;
        const buttonSpacing = 20;
        const startY = middle.y / 1.5;
        const startX = middle.x - buttonWidth / 2;

        this.resumeButton.x = startX + buttonWidth / 2;
        this.resumeButton.y = startY + (buttonHeight / 2) + buttonHeight

        this.exitButton.x = startX + buttonWidth / 2
        this.exitButton.y = (startY + (buttonHeight / 2)) + buttonHeight  * 3

        
        const padding = 10;

        this.backButton.x = startX + (buttonWidth / 4) - padding;
        this.backButton.y = startY + buttonHeight * 3;
        this.okButton.x = startX + (buttonWidth * 3 / 4) + padding;
        this.okButton.y = startY + buttonHeight * 3;

        this.areYouSureLabel.x = startX + buttonWidth / 2;
        this.areYouSureLabel.y = startY + buttonHeight;

        this.backgroundParticles.forEach((i: BackgroundParticle) => i.recalculatePosition())
    }

    public resize (): void {
        this.calculateLayout();
    }

    show () {
        super.show();

        this.exitButton.show();
        this.resumeButton.show();

        this.okButton.show();
        this.backButton.show();
        this.areYouSureLabel.show();

        this.render();
    }

    hide () {
        super.hide();

        this.exitButton.hide();
        this.resumeButton.hide();

        this.okButton.hide();
        this.backButton.hide();
        this.areYouSureLabel.hide();
    }

    showMainOptionsMeu() {
        this.hideExitConfirmationMenuButtons();
        this.showMainMenuButtons();
        this.exitButton.render();
        this.resumeButton.render();
    }

    showExitConfirmationMenu() {
        this.showExitConfirmationMenuButtons();

        this.okButton.render();
        this.backButton.render();
        this.areYouSureLabel.render();
    }

    showMainMenuButtons() {
        this.exitButton.show();
        this.resumeButton.show();
    }

    hideMainMenuButtons() {
        this.exitButton.hide();
        this.resumeButton.hide();
    }

    showExitConfirmationMenuButtons() {
        this.okButton.show();
        this.backButton.show();
        this.areYouSureLabel.show();
    }

    hideExitConfirmationMenuButtons() {
        this.okButton.hide();
        this.backButton.hide();
        this.areYouSureLabel.hide();
    }

    render () {
        super.render();

        this.p5.background(DARK_PERIWINKLE.r, DARK_PERIWINKLE.g, DARK_PERIWINKLE.b);

        this.backgroundParticles.forEach((i: BackgroundParticle) => i.render());

        this.p5.filter("blur", 3)

        this.p5.stroke(0);
        this.p5.strokeWeight(2);
        this.p5.fill(255);

        this.p5.textSize(50);
        this.p5.textAlign("center");
        const middle = new Point2D(this.screen.center.x, this.screen.center.y / 2);

        this.p5.text('Game Paused', middle.x, middle.y);
        this.p5.textSize(14);
        this.p5.text('Press esc to continue', middle.x, middle.y + 20);

        this.hideMainMenuButtons();
        this.hideExitConfirmationMenuButtons();

        switch (this.currentMenuState) {
            case PauseMenuState.MAIN_OPTIONS:
                this.showMainOptionsMeu();
                break;
            case PauseMenuState.CONFIRM_EXIT:
                this.showExitConfirmationMenu();
                break;
        }
    }
}

class BackgroundParticle extends BaseEntity {
    private r: number;
    private speed: number;
    private dir: p5.Vector;
    private color: Array<number>;

    private screen: ScreenUI;

    constructor (p5: p5, screen: ScreenUI) {
        super(p5, p5.random(screen.width), p5.random(screen.height))
        this.screen = screen;

        this.r = this.p5.random(14, 48);

        this.speed = this.p5.random(0.2, 0.8);
        const angle = p5.random(p5.TWO_PI);  // random heading in radians
        this.dir = p5.createVector(Math.cos(angle), Math.sin(angle));
        this.dir.mult(p5.random(0.2, 0.8)); // random magnitude if you want
        this.color = [ this.p5.random(50, 90), this.p5.random(80, 140), this.p5.random(100, 200) ]
    }

    recalculatePosition () {
        this.x = this.p5.random(this.screen.width)
        this.y = this.p5.random(this.screen.height)
    }

    render () {
        this.x += this.dir.x + this.p5.sin(this.p5.frameCount * 0.003 + this.r) * 0.2 * this.speed;
        this.x += this.dir.y + this.p5.cos(this.p5.frameCount * 0.004 + this.r) * 0.2 * this.speed;

        if (this.x < -100) this.x = this.screen.width + 100;
        if (this.x > this.screen.width + 100) this.x = -100;
        if (this.y < -100) this.y = this.screen.height + 100;
        if (this.y > this.screen.width + 100) this.y = -100;

        this.p5.noStroke();
        this.p5.fill(this.color);
        this.p5.ellipse(this.x, this.y, this.r);
    }
}