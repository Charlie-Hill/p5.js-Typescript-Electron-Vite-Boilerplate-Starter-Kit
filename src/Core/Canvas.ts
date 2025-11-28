import type p5 from "p5";
import Point2D from "../Class/Point2D";
import {
    CANVAS_HEIGHT,
    CANVAS_ID,
    CANVAS_WIDTH,
    FRAME_RATE
} from "../constants";

export default class Canvas {

    public canvas: HTMLElement | null;
    private p5: p5;

    public canvasCenter: Point2D;

    constructor (p5: p5) {
        this.canvas = document.getElementById(CANVAS_ID);
        this.p5 = p5;
        document.oncontextmenu = () => {return false};

        this.canvasCenter = new Point2D(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    }

    public init()
    {
        // Canvas setup
        this.p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
        this.p5.frameRate(FRAME_RATE);
        // P5 Settings
        this.p5.rectMode(this.p5.CENTER)
        this.p5.angleMode(this.p5.RADIANS)
    }
    
}