import game from "../../index.js";
import getPosByDirection from "../getPosByDirection.js";

export default function imSurrounded(bacteria) {
  let direction = bacteria.align % 8;
  for (let i = 0; i < 8; i++) {
    direction = (direction + i) % 8;
    let pos = getPosByDirection(direction);
    if (
      game.world.checkPos(bacteria, pos.x + bacteria.x, pos.y + bacteria.y) ===
      2
    ) {
      bacteria.programCounter += bacteria.genome[bacteria.programCounter + 1];
    }
  }
  return (bacteria.programCounter +=
    bacteria.genome[bacteria.programCounter + 2]);
}
