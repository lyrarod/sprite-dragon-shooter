export class Player {
  constructor(game) {
    this.game = game;

    this.width = 266;
    this.height = 266;
    this.x = this.game.canvasWidth * 0.5 - this.width * 0.5;
    this.y = this.game.canvasHeight * 0.5 - this.height * 0.5;
    this.color = "transparent";
    this.speed = 2;
    this.isMove = false;

    this.sprite = new Image(this.width, this.height);
    this.sprite.src = "dragon.png";
    this.frameX = [0, 1, 2, 1];
    this.indexFrameX = 0;
    this.frameY = 2;
    this.frame = 0;
    this.frameSpeed = 14;

    const { keyPressed } = this.game;

    this.moveLeft = () => {
      return keyPressed?.KeyA || keyPressed?.ArrowLeft;
    };
    this.moveRight = () => {
      return keyPressed?.KeyD || keyPressed?.ArrowRight;
    };
    this.moveUp = () => {
      return keyPressed?.KeyW || keyPressed?.ArrowUp;
    };
    this.moveDown = () => {
      return keyPressed?.KeyS || keyPressed?.ArrowDown;
    };
  }

  shoot() {
    const { Projectile, projectile } = this.game;

    let position = {};

    if (this.frameY === 3) {
      // UP
      position = {
        x: this.x + this.width * 0.5,
        y: this.y + 60,
      };
    }
    if (this.frameY === 0) {
      // DOWN
      position = {
        x: this.x + this.width * 0.5 + 3,
        y: this.y + this.width - 6,
      };
    }

    if (this.frameY === 1) {
      // LEFT
      position = {
        x: this.x - projectile.width + 6,
        y: this.y + this.width * 0.5 + 28,
      };
    }
    if (this.frameY === 2) {
      // RIGHT
      position = {
        x: this.x + this.width,
        y: this.y + this.width * 0.5 + 28,
      };
    }

    const direction = {
      x: this.frameY === 1 ? -1 : this.frameY == 2 ? 1 : 0,
      y: this.frameY === 3 ? -1 : this.frameY == 0 ? 1 : 0,
    };

    projectile.add(new Projectile(this.game, position, direction));
  }

  draw(ctx) {
    ctx.strokeStyle = this.color;
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    ctx.drawImage(
      this.sprite,
      this.frameX[this.indexFrameX] * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update() {
    this.isMovingCheckBoundLimits();
    // this.isMovingExceedBoundLimits();

    this.frame++;

    if (this.isMove) {
      // console.log("frame:", this.frame);

      if (this.frame >= this.frameSpeed) {
        this.frame = 0;
        this.indexFrameX++;

        if (this.indexFrameX >= this.frameX.length) {
          this.indexFrameX = 0;
        }
      }
    } else {
      this.indexFrameX = 1;
    }

    if (this.game.keyPressed.Enter && !this.isMove) {
      this.indexFrameX = 2;
    }
  }

  isMovingCheckBoundLimits() {
    this.isMove = false;

    if (this.moveLeft() && this.x > 0) {
      this.x -= this.speed;
      this.frameY = 1;
      this.isMove = true;
    }
    if (this.moveRight() && this.x + this.width < this.game.canvasWidth) {
      this.x += this.speed;
      this.frameY = 2;
      this.isMove = true;
    }

    if (this.moveUp() && this.y > 0) {
      this.frameY = 3;
      this.y -= this.speed;
      this.isMove = true;
    }
    if (this.moveDown() && this.y + this.height < this.game.canvasHeight) {
      this.frameY = 0;
      this.y += this.speed;
      this.isMove = true;
    }
  }

  isMovingExceedBoundLimits() {
    this.isMove = false;

    if (this.moveLeft()) {
      this.x -= this.speed;
      this.frameY = 1;
      this.isMove = true;

      if (this.x + this.width <= 0) {
        this.x = this.game.canvasWidth;
      }
    }
    if (this.moveRight()) {
      this.x += this.speed;
      this.frameY = 2;
      this.isMove = true;

      if (this.x >= this.game.canvasWidth) {
        this.x = -this.width;
      }
    }

    if (this.moveUp()) {
      this.y -= this.speed;
      this.frameY = 3;
      this.isMove = true;

      if (this.y + this.height <= 0) {
        this.y = this.game.canvasHeight;
      }
    }
    if (this.moveDown()) {
      this.y += this.speed;
      this.frameY = 0;
      this.isMove = true;

      if (this.y >= this.game.canvasHeight) {
        this.y = -this.height;
      }
    }
  }
}
