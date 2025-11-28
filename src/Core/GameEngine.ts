import type p5 from "p5";
import GameState from "./GameState";
import UI from "../UI/UI";

import EventHandler from "./EventHandler";
import InputProcessor from "./InputProcessor";

import TimeManager from "../World/TimeManager";

import AssetLoader from "./AssetLoader";
import Player from "../Class/Player";
import { CANVAS_HEIGHT } from "../constants";
import SquareController from "../Controllers/PlayerController";
import PlayerController from "../Controllers/PlayerController";

export default class GameEngine
{
    public p5: p5;

    public gameState: GameState;
    public UI: UI;
    
    public EventHandler: EventHandler;
    public InputProcessor: InputProcessor;

    public TimeManager: TimeManager;

    public AssetLoader: AssetLoader;

    public Player: Player;
    public PlayerController: PlayerController;

    constructor(p5: p5) {
        this.p5 = p5;

        this.TimeManager = new TimeManager();
        this.EventHandler = new EventHandler();
        this.InputProcessor = new InputProcessor(this);
        
        this.AssetLoader = new AssetLoader(this.p5);

        this.gameState = new GameState();
        this.UI = new UI(this);

        this.Player = new Player(this.p5, 250, 250, CANVAS_HEIGHT);
        this.PlayerController = new PlayerController(this.Player);

        this.registerEventListeners();
    }

    /*
     * Entry point of the game engine, initialize all core modules here
     */
    public async initialize()
    {
        this.initializeDrawingOptions();

        // Handle loading assets, setting up initial game state, etc.
        await this.AssetLoader.loadAllAssets()
    }

    public render()
    {
        this.TimeManager.update();

        if (this.gameState.isPaused()) {
            return this.UI.pauseUI.show();
        }
        this.UI.pauseUI.hide();

        this.PlayerController.handleInput(this.p5);
        this.PlayerController.update();
        this.PlayerController.render();

        if (this.gameState.isDebugMode()) {
            this.UI.debugUI.addLine(`Time Scale ${this.TimeManager.timeScale}x`);
            this.UI.debugUI.render();
        }
    }

    private registerEventListeners()
    {
        window.addEventListener('resize', () => {
            this.UI.windows.forEach(i => i.resize())
        }, true)
    }

    private initializeDrawingOptions()
    {
        // Set smooth drawing options (TODO: maybe have game options to control this)
        this.p5.smooth();
        const ctx = this.p5.drawingContext as CanvasRenderingContext2D;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high"

        // Font options
        this.p5.textFont("Arial");
    }
}