import game from "../../index.js";
import settings from "../../settings.js";
import getPosByDirection from "../getPosByDirection.js";

export default function eat(bacteria) {
  let direction =
    (bacteria.align + bacteria.genome[bacteria.programCounter + 1]) % 8;

  let pos = getPosByDirection(direction);
  let res = game.world.checkPos(
    bacteria,
    bacteria.x + pos.x,
    bacteria.y + pos.y
  );
  if (res === 4 || res === 5) {
    bacteria.energy +=
      game.world.grid[bacteria.x + pos.x][bacteria.y + pos.y].energy / 4;
    bacteria.energyFromAttack +=
      game.world.grid[bacteria.x + pos.x][bacteria.y + pos.y].energy / 4;
    game.world.grid[bacteria.x + pos.x][bacteria.y + pos.y] = undefined;
    // bacteria.color = res === 4 ? "blue" : "red";
  }
  bacteria.energy -= settings.actionsPrice.eat;
  bacteria.programCounter += bacteria.genome[bacteria.programCounter + res];
  bacteria.iter = 0;
}
