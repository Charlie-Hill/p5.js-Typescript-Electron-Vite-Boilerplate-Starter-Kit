export default class TimeManager {

    private lastUpdate: number;
    public deltaTime: number;
    public rawDeltaTime: number;
    public timeScale: number;
    public totalTime: number;

    constructor () {
        this.lastUpdate = performance.now();
        this.deltaTime = 0;
        this.rawDeltaTime = 0;
        this.timeScale = 1; // 1x, 2x
        this.totalTime = 0;
    }

    update () {
        const now = performance.now();
        const rawDelta = (now - this.lastUpdate) / 1000; // ms to s
        this.rawDeltaTime = rawDelta;
        this.deltaTime = rawDelta * this.timeScale;
        this.totalTime += this.deltaTime;
        this.lastUpdate = now;
    }

    setSpeed = (multiplier: number) => this.timeScale = multiplier;

    setTimePause = (pause: boolean) => (pause === true) ? this.timeScale = 0 : this.timeScale = 1;

}