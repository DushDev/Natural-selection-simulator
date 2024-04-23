import getPosByDirection from "../../../utils/getPosByDirection";
import Simulation from "../../index";
import Bot from "../bot";
import GenomeManager from "../genome";

export default function giveEnergy(bot: Bot, simulation: Simulation) {
  let direction = (bot.align + bot.genome[bot.programCounter + 1]) % 8;

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
  if (res === 6) {
    simulation.world.getGrid(bot.x + pos.x, bot.y + pos.y)!.energy +=
      bot.energy / 3;
    bot.energy /= 3;
  }
  bot.programCounter += bot.genome[bot.programCounter + res];
  bot.iter = 0;
}
