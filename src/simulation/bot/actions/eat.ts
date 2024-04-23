import getPosByDirection from "../../../utils/getPosByDirection.js";
import Bot from "../bot.js";
import GenomeManager from "../genome.js";
import Simulation from "../../index";

export default function eat(bot: Bot, simulation: Simulation) {
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
  if (res === 4 || res === 5) {
    bot.energy +=
      simulation.world.getGrid(bot.x + pos.x, bot.y + pos.y)!.energy / 4;
    bot.energyFromAttack +=
      simulation.world.getGrid(bot.x + pos.x, bot.y + pos.y)!.energy / 4;
    simulation.world.setGrid(bot.x + pos.x, bot.y + pos.y, undefined);
  }
  bot.energy -= 27;
  bot.programCounter += bot.genome[bot.programCounter + res];
  bot.iter = 0;
}
