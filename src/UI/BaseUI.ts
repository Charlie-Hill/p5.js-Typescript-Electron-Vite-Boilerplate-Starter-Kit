import * as p5 from "p5"

import { IBaseUI } from "../interfaces";

export default class BaseUI implements IBaseUI
{
    public p5: p5;
    public x: number;
    public y: number;
    public isShowing: boolean;

    constructor (p5: p5) {
        this.p5 = p5;
        this.x = 0;
        this.y = 0;
        this.isShowing = false;
    }

    public show () {
        this.isShowing = true;
    }

    public hide () { 
        this.isShowing = false; 
    }

    public render()
    {
        if (!this.isShowing) return;
    }

    // resetCursor () ---- override this in above classes?

}