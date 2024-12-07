import "./style.css";
import Phaser from "phaser";
import sizes from "./data/sizes";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;

class GameScene extends Phaser.Scene {
  constructor() {
    super("scene-game");
  }

  preload() {}

  create() {}

  update() {}
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  canvas,
  scene: [GameScene],
};

const game = new Phaser.Game(config);
