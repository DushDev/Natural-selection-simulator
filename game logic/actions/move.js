import game from "../../index.js";
import settings from "../../settings.js";
import getPosByDirection from "../getPosByDirection.js";

export default function move(bacteria) {
  let direction =
    (bacteria.align + bacteria.genome[bacteria.programCounter + 1]) % 8;

  let pos = getPosByDirection(direction);
  //   game.world.move(bacteria, bacteria.x + pos.x, bacteria.y + pos.y);
  let newX = bacteria.x + pos.x;
  let newY = bacteria.y + pos.y;
  //   if (newX < 0) newX = this.width - 1;
  //   if (newX >= this.width) newX = 0;
  let res = game.world.checkPos(bacteria, newX, newY);
  if (res === 2) {
    game.world.grid[newX][newY] = bacteria;
    game.world.grid[bacteria.x][bacteria.y] = undefined;
    bacteria.x += pos.x;
    bacteria.y += pos.y;
  }
  bacteria.energy -= settings.actionsPrice.move;
  bacteria.programCounter += bacteria.genome[bacteria.programCounter + res];
  bacteria.iter = 0;
}
