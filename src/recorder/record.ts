import Simulation from "../simulation";
import World from "../simulation/ world";
import IRecord from "./irecord";

export default class Record {
  simulation: Simulation;
  record: IRecord | null = null;
  recordedSteps = 0;
  constructor(simulation: Simulation) {
    this.simulation = simulation;
    this.start();
  }
  start() {
    this.record = {
      worldWidth: this.simulation.world.grid.length,
      worldHeight: this.simulation.world.grid[0].length,
      gridRecord: [this.simulation.world.grid],
    };
  }
  addStep() {
    this.recordedSteps++;
    this.record?.gridRecord.push(this.simulation.world.grid);
  }
  end() {
    // this.endStep = this.simulation.steps;
  }
}
