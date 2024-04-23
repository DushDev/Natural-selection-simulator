import Simulation from "..";
import store from "../../app/store";
import changeColor from "../../utils/changeColor";
import createColor from "../../utils/createColor";
import getRandomInRange from "../../utils/random";
import actions from "./actions";
import spawnChild from "./actions/spawnChild";
import GenomeManager from "./genome";
import IBot from "./ibot";

export default class Bot {
  x: number;
  y: number;
  genome: number[];
  died = false;
  energy = 300;
  type = "bot";
  color = "green";
  programCounter = 0;
  minerals = 0;
  fall = true;
  moved = false;
  iter = 0;
  speciesColor = "rgb(150, 150, 150)";
  simulation: Simulation;
  align = Math.round(getRandomInRange(0, 8));

  toOrganic = false;
  energyFromAttack = 0;
  energyFromPhotosintesis = 0;
  energyFromMinerals = 0;
  constructor({ x, y, genome, color, simulation, speciesColor }: IBot) {
    const { controller } = store.getState();
    const { mutations } = controller;
    this.x = x;
    this.y = y;
    this.color = color || "green";
    this.simulation = simulation;
    if (genome) {
      if (Math.random() < mutations) {
        this.genome = GenomeManager.mutateGenome(genome);
        this.speciesColor = changeColor(speciesColor || this.speciesColor);
      } else {
        this.genome = genome;
        this.speciesColor = speciesColor || "rgb(255,255,255)";
      }
    } else {
      this.genome = GenomeManager.generateGenome();
      this.speciesColor = `rgb(${Math.round(Math.random() * 255)},${Math.round(
        Math.random() * 255
      )},${Math.round(Math.random() * 255)})`;
    }
  }
  update() {
    if (this.moved) {
      this.moved = false;
      return;
    }
    const { controller } = store.getState();
    const { maxIter } = controller;
    if (this.type == "bot") {
      this.energy -= 1;
      this.energy = Math.round(this.energy);
      if (this.energy > 950) spawnChild(this, this.simulation);

      //   let mineralsAdd = settings.mineralLevels[Math.floor(this.y / 8) * 8];
      //   if (mineralsAdd) this.minerals += mineralsAdd;
      if (this.energy > 1000) this.energy = 1000;
      if (this.energy <= 0) {
        this.die();
        return;
      }
      this.iter = maxIter;
      while (this.iter > 0) {
        let command = this.genome[this.programCounter];
        if (actions[command]) actions[command](this, this.simulation);
        else this.programCounter += command;
        this.programCounter %= this.genome.length;
        this.iter--;
      }
      if (this.toOrganic) {
        this.type = "organic";
      }
      if (this.energy > 1000) this.energy = 1000;
      if (this.energy <= 0) {
        this.die();
        return;
      }
    } else this.updateAsOrganic();

    //color
    if (
      this.energyFromAttack > 300 ||
      this.energyFromMinerals > 300 ||
      this.energyFromPhotosintesis > 300
    ) {
      this.color = createColor(
        this.energyFromAttack,
        this.energyFromPhotosintesis,
        this.energyFromMinerals
      );
      this.energyFromAttack /= 10;
      this.energyFromMinerals /= 10;
      this.energyFromPhotosintesis /= 10;
    }
  }
  updateAsOrganic() {
    if (this.fall) {
      if (this.simulation.world.checkPos(this.x, this.y + 1) === 2) {
        this.y++;
        this.simulation.world.setGrid(this.x, this.y, this);
        this.simulation.world.setGrid(this.x, this.y - 1, undefined);
      } else {
        this.fall = false;
      }
    }
  }
  die() {
    this.simulation.world.setGrid(this.x, this.y, undefined);
  }
}
