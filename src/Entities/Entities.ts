import { IEntity } from "../interfaces";

export default class Entities {

    public entities: IEntity[];

    public constructor() {
        this.entities = [];
    }

    public render () {
        this.entities.forEach(e => e.render());
    }

}