import game from "../../index.js";
import settings from "../../settings.js";
import getRandomInRange from "../../utils/random.js";
import Bot from "../bacteria.js";
import getPosByDirection from "../getPosByDirection.js";
import imSurrounded from "./imSurrounded.js";

export default function spawnChild(bacteria) {
  if (bacteria.energy < settings.minEnergyToReproduce) return;
  let surrounded = false;
  for (let i = 0; i < 8; i++) {
    let direction = i % 8;
    let pos = getPosByDirection(direction);
    if (
      game.world.checkPos(bacteria, pos.x + bacteria.x, pos.y + bacteria.y) !==
      2
    )
      surrounded = true;
  }
  bacteria.programCounter += 1;
  let direction =
    bacteria.align + (bacteria.genome[bacteria.programCounter] % 8); //Math.round(getRandomInRange(0, 7));
  // for (let i = 0; i < 8; i++) {
  // direction = (direction + i) % 8;
  let pos = getPosByDirection(direction % 8);
  if (
    game.world.checkPos(bacteria, pos.x + bacteria.x, pos.y + bacteria.y) === 2
  ) {
    bacteria.energy = bacteria.energy - settings.actionsPrice.reproduce;
    let child = new Bot(
      bacteria.x + pos.x,
      bacteria.y + pos.y,
      bacteria.genome,
      bacteria.specColor
    );
    // console.log(child.specColor);
    child.color = bacteria.color;
    // child.specColor = bacteria.specColor;
    game.world.grid[bacteria.x + pos.x][bacteria.y + pos.y] = child;
    return;
  }
  // }
  // console.log("cant spawn");
  if (surrounded) return (bacteria.toOrganic = true);
}
