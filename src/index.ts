import p5 from "p5";

import { COLOR_BACKGROUND } from "./constants";

import "./style.css";
import Canvas from "./Core/Canvas";

import GameEngine from "./Core/GameEngine";

const main = (p: p5) => {
  const _gameEngine: GameEngine = new GameEngine(p);

  const canvas = new Canvas(p);

  p.setup = async () => {
    canvas.init();

    await _gameEngine.initialize();
  };

  p.draw = () => {
    p.background(COLOR_BACKGROUND);

    _gameEngine.render();
  }

  p.keyPressed = () => _gameEngine.InputProcessor.handleKeyPressed()

  p.keyReleased = () => _gameEngine.InputProcessor.handleKeyReleased();
  
  p.mousePressed = () => _gameEngine.InputProcessor.handleMousePressed()

  p.mouseMoved = () => _gameEngine.InputProcessor.handleMouseMoved()

  p.mouseDragged = () => _gameEngine.InputProcessor.handleMouseDragged()

  p.mouseReleased = () => _gameEngine.InputProcessor.handleMouseReleased();
  
};

new p5(main);
