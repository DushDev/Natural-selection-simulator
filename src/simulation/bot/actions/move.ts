import Simulation from "../..";
import getPosByDirection from "../../../utils/getPosByDirection";
import Bot from "../bot";

export default function move(bot: Bot, simulation: Simulation) {
  let direction = (bot.align + bot.genome[bot.programCounter + 1]) % 8;

  let pos = getPosByDirection(direction);
  let newX = bot.x + pos.x;
  let newY = bot.y + pos.y;
  let res = simulation.world.checkPos(newX, newY);
  if (res === 2) {
    const { x, y } = simulation.world.setGrid(newX, newY, bot);
    simulation.world.setGrid(bot.x, bot.y, undefined);
    bot.x = x;
    bot.y = y;
  }
  bot.energy -= 21;
  bot.moved = true;
  bot.programCounter += bot.genome[bot.programCounter + res];
  bot.iter = 0;
}
