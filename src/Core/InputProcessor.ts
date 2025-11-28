import p5 from "p5";

import GameEngine from "./GameEngine";

import Point2D from "../Class/Point2D";
import { KeyCode } from "../constants";
import { IClickable } from "../interfaces";

export default class InputProcessor
{
    public p5: p5;
    public readonly _gameEngine: GameEngine;
    
    private _clickableElements: IClickable[] = [];

    private keysDown: Set<number> = new Set();

    constructor (engine: GameEngine)
    {
        this._gameEngine = engine;
        this.p5 = this._gameEngine.p5;
    }
    
    handleMousePressed () {
        // if (this.p5.mouseButton.left && this._gameEngine.gameState.isPaused()) this._gameEngine.gameState.setPaused(false);

        this._clickableElements.forEach((element) => {
            if (element.isMouseOver(this.p5.mouseX, this.p5.mouseY) && element.isShowing) {
                element.handleClick(this.p5.mouseX, this.p5.mouseY);
            }
        })

        if ((this._gameEngine.gameState.isPaused())) return false;

        if (this.p5.mouseButton.right) {
            alert('Right Click')
        }

        if (this.p5.mouseButton.left) {
            alert('Left Click')
        }

        if (this.p5.mouseButton.center && this._gameEngine.gameState.isDebugMode()) {

            alert('Middle Click')

        }
    }

    handleMouseDragged () {

    }

    handleMouseMoved () {
        

        // Reset Cursor Code TODO: move this to a utility class
        let elementIsUnderCursor = false;
        this._clickableElements.forEach((element) => {
            element.isHover = element.isMouseOver(this.p5.mouseX, this.p5.mouseY);
            
            if (element.isHover && element.isShowing) {
                this.p5.cursor('pointer');
                elementIsUnderCursor = true;
            }
        })

        if (!elementIsUnderCursor) {
            this.p5.cursor('default');
        }
    }

    handleMouseReleased () {

    }
    
    handleKeyPressed () {
        this.keysDown.add(this.p5.keyCode);

        if (this.p5.keyCode === KeyCode.ESC) {
            this._gameEngine.gameState.setPaused(!this._gameEngine.gameState.isPaused())
        }

        if (this.p5.keyCode === KeyCode.SPACE) {
            // this._gameEngine.TimeManager.setTimePause(this._gameEngine.TimeManager.timeScale > 0)

            this._gameEngine.Player.jump();
        }

        // DEBUG
        this._gameEngine.UI.debugUI.lastKeyPressed = this.p5.keyCode;
    }

    handleKeyReleased () {
        this.keysDown.delete(this.p5.keyCode);
    }

    public isKeyDown (code: number): boolean {
        return this.keysDown.has(code);
    }

    public registerClickableElement (element: IClickable) {
        this._clickableElements.push(element);
    }

}