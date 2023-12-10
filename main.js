import { Game } from "./Game";
import "./style.css";

addEventListener("load", () => {
  const game = new Game();
  game.start();
  console.log(game);
});
