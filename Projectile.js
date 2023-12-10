export class Projectile {
  constructor(game, position, direction) {
    this.game = game;
    this.position = position ?? {};
    this.direction = direction ?? {};
    this.width = 6;
    this.height = 8;
    this.speed = 10;
    this.color = "firebrick";
    this.projectiles = [];
  }

  add(projectile) {
    this.projectiles.push(projectile);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.position.x, this.position.y, this.width, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.projectiles.forEach((projectile) => {
      projectile.draw(this.game.ctx);
      projectile.position.x += this.speed * projectile.direction.x;
      projectile.position.y += this.speed * projectile.direction.y;

      this.projectiles = this.projectiles.filter((obj) => {
        // remove projectile
        return (
          obj.position.y > -obj.height &&
          obj.position.y < this.game.canvasHeight &&
          obj.position.x > -obj.width &&
          obj.position.x < this.game.canvasWidth
        );
      });
    });
    // console.log(this.projectiles);
  }
}
