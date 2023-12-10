import { Player } from "./Player";
import { Projectile } from "./Projectile";

export class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvasWidth = this.canvas.width = 800;
    this.canvasHeight = this.canvas.height = 500;

    this.keyPressed = {};
    this.inputKeyBoard();
    this.gameObjects = [];

    this.player = new Player(this);
    this.Projectile = Projectile;
    this.projectile = new Projectile(this);
  }

  draw() {
    // console.log("draw");
    this.gameObjects.forEach((obj) => obj.draw(this.ctx));
  }

  update() {
    // console.log("update");
    this.gameObjects.forEach((obj) => obj.update());
  }

  loop() {
    // console.log("loop...");
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }

  start() {
    // console.log("start!");
    this.gameObjects = [this.player, this.projectile];
    requestAnimationFrame(() => this.loop());
  }

  inputKeyBoard() {
    let lastEvent = null;

    addEventListener("keydown", ({ code }) => {
      this.keyPressed[code] = true;

      if (lastEvent === code) return;
      lastEvent = code;

      if (this.keyPressed.Enter && lastEvent === "Enter") {
        this.player.shoot();
      }
    });

    addEventListener("keyup", ({ code }) => {
      this.keyPressed[code] = false;
      lastEvent = null;
      delete this.keyPressed[code];
    });
  }
}
