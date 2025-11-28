import type p5 from "p5";

export interface IEntity {
  x: number;
  y: number;
  render(): void;
}

export interface IScaleableEntity extends IEntity {
  scale: number;
}

export interface IBaseUI extends IEntity {
  p5: p5;
  isShowing: boolean;
}

export interface IClickable extends IBaseUI {
  isHover: boolean;
  handleClick(mouseX: number, mouseY: number): void;
  isMouseOver(mouseX: number, mouseY: number): boolean;
}

export interface IMoveable {
  moveRight(): void;
  moveLeft(): void;
  jump(): void;
}