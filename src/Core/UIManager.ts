import type p5 from "p5";
import UI from "../UI/UI";

export default class UIManager {

    public UI: UI;

    constructor (p5: p5) {
        this.UI = new UI(p5)
    }

    render () {
        this.UI.debugUI.render()
    }

}