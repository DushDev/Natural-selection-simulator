import Render from "./game logic/render.js";
import World from "./game logic/world.js";
import Gui from "./gui/gui.js";
import settings from "./settings.js";

export default class Game {
  isRender = true;
  ups = 0;
  lastUpdate = Date.now();
  updatesCount = 0;
  constructor() {
    this.world = new World();
    this.gui = new Gui();
    this.render = new Render(this.gui.canvas, this.world);
  }
  start() {
    setInterval(() => {
      if (this.isRender) this.render.render(this.ups);
      this.gui.update();
    }, 1000 / 30);
    this.update();
  }
  update() {
    this.updatesCount++;
    // console.log(this.world);
    this.world.update();
    setTimeout(() => {
      this.update();
      if (this.updatesCount % 10 === 0) this.superUpdate();
    }, 1000 / settings.fps);
    this.ups = 1000 / (Date.now() - this.lastUpdate);
    this.lastUpdate = Date.now();
  }

  superUpdate() {
    this.world.superUpdate();
  }
}
