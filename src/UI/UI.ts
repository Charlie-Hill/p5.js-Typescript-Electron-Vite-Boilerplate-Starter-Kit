import Debug from "./Debug";
import PauseUI from "./PauseUI";
import GameEngine from "../Core/GameEngine";
import { IClickable } from "../interfaces";
import WindowUI from "./WindowUI";
import ScreenUI from "./ScreenUI";

export default class UI {

    public _gameEngine: GameEngine;
    public debugUI: Debug;
    public pauseUI: PauseUI;

    protected screen: ScreenUI;

    public windows: WindowUI[] = [];
    private clickables: IClickable[] = [];

    public cursor: string = 'default';

    constructor (gameEngine: GameEngine) {
        this._gameEngine = gameEngine;
        
        this.screen = new ScreenUI(this._gameEngine.p5);

        this.debugUI = new Debug(this._gameEngine.p5);
        this.pauseUI = new PauseUI(this._gameEngine.p5, this.screen, this.onResumeClick);

        this.registerWindowUI(this.pauseUI);

        // TODO: Refactor clickable registration so it is automatic based on interface implementation
        this.clickables.push(this.pauseUI.exitButton);
        this.clickables.push(this.pauseUI.resumeButton);
        this.clickables.push(this.pauseUI.okButton);
        this.clickables.push(this.pauseUI.backButton);

        this.clickables.forEach((element) => {
            this._gameEngine.InputProcessor.registerClickableElement(element);
        });
    }

    private registerWindowUI (ui: WindowUI) {
        this.windows.push(ui);
    }

    private onResumeClick = () => {
        this._gameEngine.gameState.setPaused(false);
    }

}