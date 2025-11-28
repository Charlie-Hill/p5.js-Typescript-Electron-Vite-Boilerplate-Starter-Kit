export default class GameState {

    public tick: number;
    private paused: boolean;

    private debugMode: boolean;

    constructor () {
        this.tick = 0;
        this.paused = false;

        this.debugMode = true;
    }

    public isPaused = () => this.paused;

    public isDebugMode = () => this.debugMode;

    public setPaused (paused: boolean) {
        this.paused = paused;
    };

}