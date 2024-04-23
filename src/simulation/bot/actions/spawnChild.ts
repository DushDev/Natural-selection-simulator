import Simulation from "../..";
import getPosByDirection from "../../../utils/getPosByDirection";
import Bot from "../bot";

export default function spawnChild(bot: Bot, simulation: Simulation) {
  if (bot.energy < 500) return;
  let surrounded = false;
  for (let i = 0; i < 8; i++) {
    let direction = i % 8;
    let pos = getPosByDirection(direction);
    if (simulation.world.checkPos(pos.x + bot.x, pos.y + bot.y) !== 2)
      surrounded = true;
  }
  bot.programCounter += 1;
  let direction = bot.genome[bot.programCounter] % 8;
  let pos = getPosByDirection(direction % 8);
  if (simulation.world.checkPos(pos.x + bot.x, pos.y + bot.y) === 2) {
    bot.energy = bot.energy - 400;
    let child = new Bot({
      x: bot.x + pos.x,
      y: bot.y + pos.y,
      genome: bot.genome,
      color: bot.color,
      simulation,
      speciesColor: bot.speciesColor,
    });
    const { x, y } = simulation.world.setGrid(
      bot.x + pos.x,
      bot.y + pos.y,
      child
    );
    child.x = x;
    child.y = y;
    return;
  }
  if (surrounded) return (bot.toOrganic = true);
}
