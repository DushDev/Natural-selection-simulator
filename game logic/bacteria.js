import settings from "../settings.js";
import getRandomInRange from "../utils/random.js";
import game from "../index.js";
import actions from "./actions.js";
import generateGenome from "./generateGenome.js";
import mutateGenome from "./mutateGenome.js";
import getPosByDirection from "./getPosByDirection.js";
import rgbToHex from "./generateColor.js";
import spawnChild from "./actions/spawnChild.js";

export default class Bot {
  constructor(x, y, genome, specColor) {
    this.type = "bot";
    this.x = x;
    this.y = y; //
    // console.log(this.y);
    // this.color = "green";
    this.align = Math.round(getRandomInRange(0, 7)); //random 0..7
    // console.log(mutateRate);
    if (genome) {
      if (Math.random() < settings.mutationsRate) {
        this.genome = mutateGenome(genome);
        this.specColor = `rgb(${Math.round(Math.random() * 255)},${Math.round(
          Math.random() * 255
        )},${Math.round(Math.random() * 255)})`;
      } else {
        this.genome = genome;
        this.specColor = specColor;
      }
    } else {
      this.genome = generateGenome();
      this.specColor = `rgb(${Math.round(Math.random() * 255)},${Math.round(
        Math.random() * 255
      )},${Math.round(Math.random() * 255)})`;
    }
    this.programCounter = 0;
    this.energy = 300;
    this.minerals = 0;
    this.fall = true;
    this.iter = settings.maxIter;
    this.energyFromAttack = 0;
    this.energyFromPhotosintesis = 0;
    this.energyFromMinerals = 0;
    // this.specColor = "";
  }
  update() {
    if (this.type == "bot") {
      this.energy -= 1;
      this.energy = Math.round(this.energy);
      if (this.energy > 950) spawnChild(this);

      let mineralsAdd = settings.mineralLevels[Math.floor(this.y / 8) * 8];
      if (mineralsAdd) this.minerals += mineralsAdd;
      if (this.energy > 1000) this.energy = 1000;
      if (this.energy <= 0) {
        this.die();
        return;
      }
      this.iter = settings.maxIter;
      while (this.iter > 0) {
        let command = this.genome[this.programCounter];
        if (actions[command]) actions[command](this);
        else this.programCounter += command;
        this.programCounter %= this.genome.length;
        this.iter--;
      }
      if (this.toOrganic) {
        this.type = "organic";
        this.color = "gray";
      }
      if (this.energy > 1000) this.energy = 1000;
      if (this.energy <= 0) {
        this.die();
        return;
      }
    } else this.updateAsOrganic();
  }

  superUpdate() {
    if (
      this.energyFromAttack +
        this.energyFromMinerals +
        this.energyFromPhotosintesis >
      10
    )
      this.color = rgbToHex(
        this.energyFromAttack,
        this.energyFromPhotosintesis,
        this.energyFromMinerals
      );
    // this.energyFromAttack = 0;
    // this.energyFromMinerals = 0;
    // this.energyFromPhotosintesis = 0;
  }

  updateAsOrganic() {
    if (this.fall) {
      if (game.world.checkPos(this, this.x, this.y + 1) === 2) {
        this.y++;
        game.world.grid[this.x][this.y] = this;
        game.world.grid[this.x][this.y - 1] = undefined;
      } else {
        this.fall = false;
      }
    }
  }

  die() {
    // console.log("die ", this.y, 10 - Math.floor(this.y / 10));
    game.world.grid[this.x][this.y] = undefined;
  }
}
