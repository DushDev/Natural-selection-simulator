import getPosByDirection from "../../../utils/getPosByDirection.js";
import Simulation from "../../index.js";
import Bot from "../bot.js";

export default function imSurrounded(bot: Bot, simulation: Simulation) {
  let direction = bot.align % 8;
  for (let i = 0; i < 8; i++) {
    direction = (direction + i) % 8;
    let pos = getPosByDirection(direction);
    if (simulation.world.checkPos(pos.x + bot.x, pos.y + bot.y) === 2) {
      bot.programCounter += bot.genome[bot.programCounter + 1];
    }
  }
  return (bot.programCounter += bot.genome[bot.programCounter + 2]);
}
