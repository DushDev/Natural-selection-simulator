import store from "../app/store";
import Player from "../player/player";
import Recorder from "../recorder/recorder";
import World from "./ world";
class Simulation {
  world = new World(this);
  ups = 0;
  lastUpdate = Date.now();
  active = false;
  steps = 0;
  STATE: any = {};
  recorder: Recorder = new Recorder(this);
  player: Player = new Player(this)
  constructor() {}
  start() {
    if (this.active) return;
    this.active = true;
    this.STATE.simulationActive[1](this.active);
    this.update();
  }

  stop() {
    this.active = false;
    this.STATE.simulationActive[1](this.active);
  }
  clear() {
    this.world.clear();
    this.steps = 0;
  }
  update() {
    const { controller } = store.getState();
    const { gameSpeed } = controller;

    this.world.update();
    this.steps++;
    for (let i = 0; i < gameSpeed - 199; i++) {
      this.world.update();
      this.recorder.recordStep();
      this.steps++;
    }
    setTimeout(() => {
      if (this.active) this.update();
    }, 1000 / gameSpeed);
    this.ups = 1000 / (Date.now() - this.lastUpdate);
    this.lastUpdate = Date.now();
  }

  updateState() {
    this.STATE.stepsSpeed[1](this.steps - this.STATE.steps[0]);
    this.STATE.steps[1](this.steps);
    this.STATE.recordedSteps[1](this.recorder.currentRecord?.recordedSteps);
  }
}

export default Simulation;
