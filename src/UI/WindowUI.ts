import p5 from "p5";
import BaseUI from "./BaseUI";
import ScreenScaler from "./ScreenScaler";
import ScreenUI from "./ScreenUI";

export default abstract class WindowUI extends BaseUI {
    protected scaler: ScreenScaler;
    protected screen: ScreenUI;

    constructor (p5: p5, screen: ScreenUI)
    {
        super(p5);

        this.screen = new ScreenUI(p5);
        this.scaler = new ScreenScaler(p5);
    }

    public abstract resize(): void;

}
