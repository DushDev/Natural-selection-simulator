import game from "../../index.js";
import settings from "../../settings.js";
import getPosByDirection from "../getPosByDirection.js";

export default function giveEnergy(bacteria) {
  let direction =
    (bacteria.align + bacteria.genome[bacteria.programCounter + 1]) % 8;

  let pos = getPosByDirection(direction);
  let res = game.world.checkPos(
    bacteria,
    bacteria.x + pos.x,
    bacteria.y + pos.y
  );
  if (res === 6) {
    game.world.grid[bacteria.x + pos.x][bacteria.y + pos.y].energy +=
      bacteria.energy / 3;
    bacteria.energy /= 3;
  }
  bacteria.programCounter += bacteria.genome[bacteria.programCounter + res];
  bacteria.iter = 0;
}
