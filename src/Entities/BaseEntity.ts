import * as p5 from 'p5'
// import { IMouseInteractable } from '../interfaces';

export default class BaseEntity 
{
    public p5: p5;
    public x: number;
    public y: number;

    constructor(p5: p5, x: number, y: number) {
        this.p5 = p5;
        this.x = x;
        this.y = y
    }

    public render() {
        
    }
}