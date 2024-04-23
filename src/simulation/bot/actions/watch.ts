import Simulation from "../..";
import getPosByDirection from "../../../utils/getPosByDirection";
import Bot from "../bot";
import GenomeManager from "../genome";

export default function watch(bot: Bot, simulation: Simulation) {
  let direction = bot.align % 8;

  let pos = getPosByDirection(direction);
  let res = simulation.world.checkPos(bot.x + pos.x, bot.y + pos.y);
  if (res === 5)
    if (
      GenomeManager.compareGenomes(
        bot.genome,
        simulation.world.getGrid(bot.x + pos.x, bot.y + pos.y)?.genome!
      )
    )
      res = 6;
  bot.programCounter += bot.genome[bot.programCounter + res];
}
