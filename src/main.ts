import "./style.css";
import Phaser from "phaser";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;

const sizes = {
  width: 500,
  height: 500,
  appleSize: 50,
  basketWidth: 80,
  basketHeight: 15,
  appleDepth: 0,
  basketDepth: 1,
};

const speedDown = 300;

class GameScene extends Phaser.Scene {
  basket: Phaser.Physics.Arcade.Image | null = null;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
  basketSpeed = speedDown + 50;
  apple: Phaser.Physics.Arcade.Image | null = null;
  score = 0;
  textScore: Phaser.GameObjects.Text | null = null;

  constructor() {
    super("scene-game");
  }

  preload() {
    this.load.image("bg", "/public/assets/bg.png");
    this.load.image("basket", "/public/assets/basket.png");
    this.load.image("apple", "/public/assets/apple.png");
  }
  create() {
    // Background
    this.add.image(0, 0, "bg").setOrigin(0, 0);

    // Basket
    this.basket = this.physics.add
      .image(0, sizes.height, "basket")
      .setOrigin(0, 0);
    this.basket.setCollideWorldBounds(true);
    this.basket.setImmovable(true);
    this.basket
      .setSize(sizes.basketWidth, sizes.basketHeight)
      .setOffset(0, sizes.basketHeight * 5);
    this.basket.setDepth(sizes.basketDepth);

    // Apples
    this.apple = this.physics.add.image(0, 0, "apple").setOrigin(0, 0);
    this.apple.setDisplaySize(sizes.appleSize, sizes.appleSize);
    this.apple.setVelocityY(speedDown);
    this.apple.setMaxVelocity(0, speedDown);
    this.apple.setDepth(sizes.appleDepth);

    // Score text
    this.textScore = this.add.text(sizes.width / 2, 10, "Score: 0", {
      fontSize: "24px",
      color: "#000",
    });
    this.textScore.setOrigin(0.5, 0);
    // overlap
    this.physics.add.overlap(this.basket, this.apple, () => {
      this.targetHit();
    });

    // cursor
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    }
  }
  update() {
    // basket movement
    if (this.basket) {
      if (this.cursors?.left?.isDown) {
        this.basket.setVelocityX(-this.basketSpeed);
      } else if (this.cursors?.right?.isDown) {
        this.basket.setVelocityX(this.basketSpeed);
      } else {
        this.basket.setVelocityX(0);
      }
    }

    // apple movement
    if (this.apple) {
      if (this.apple.y >= sizes.height) {
        this.apple.setY(0);
        this.apple.setX(this.getRandomX());
      }
    }
  }

  getRandomX() {
    return Math.floor(
      Math.random() * (sizes.width - sizes.appleSize * 2) + sizes.appleSize
    );
  }

  targetHit() {
    this.apple?.setY(0);
    this.apple?.setX(this.getRandomX());
    this.score++;
    this.textScore?.setText(`Score: ${this.score}`);
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  canvas,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: speedDown },
      debug: true,
    },
  },
  scene: [GameScene],
};

const game = new Phaser.Game(config);
