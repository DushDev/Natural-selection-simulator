import game from "../../index.js";
import getPosByDirection from "../getPosByDirection.js";

export default function watch(bacteria) {
  let direction = bacteria.align % 8;

  let pos = getPosByDirection(direction);
  let res = game.world.checkPos(
    bacteria,
    bacteria.x + pos.x,
    bacteria.y + pos.y
  );
  bacteria.programCounter += bacteria.genome[bacteria.programCounter + res];
}
