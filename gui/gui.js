import settings from "../settings.js";
import game from "../index.js";
import giveSpecColors from "../game logic/giveSpecColors.js";

export default class Gui {
  canvas = document.getElementById("canvas");
  addBtn = document.getElementById("add");
  clearBtn = document.getElementById("clear");
  mutateText = document.getElementById("mutateText");
  mutateRange = document.getElementById("mutateRange");
  updateSpeedText = document.getElementById("updSpeedText");
  updateSpeedRange = document.getElementById("updSpeedRange");
  viewNormal = document.getElementById("view-normal");
  viewEnergy = document.getElementById("view-energy");
  viewColors = document.getElementById("view-colors");

  constructor() {
    this.mutateText.innerHTML = "Mutate rate: " + settings.mutationsRate;
    this.updateSpeedText.innerHTML = "Update speed: " + settings.fps;
    this.mutateRange.value = settings.mutateRate;
    this.updateSpeedRange.value = settings.updateSpeedRange;

    this.addBtn.onclick = () => {
      game.world.spawnBots(100);
    };

    this.clearBtn.onclick = () => {
      game.world.clear();
    };

    this.viewEnergy.onclick = () => {
      settings.viewmode = "energy";
    };
    this.viewNormal.onclick = () => {
      settings.viewmode = "normal";
    };
    this.viewColors.onclick = () => {
      // giveSpecColors();
      settings.viewmode = "specColors";
    };

    this.mutateRange.oninput = (e) => {
      settings.mutationsRate = e.target.value;
      this.mutateText.innerHTML = "Mutate rate: " + e.target.value;
    };
    this.updateSpeedRange.oninput = (e) => {
      settings.fps = e.target.value;
      this.updateSpeedText.innerHTML = "Update speed: " + e.target.value;
    };

    document.addEventListener("keydown", (e) => {
      //space
      if (e.keyCode === 32) {
        game.isRender = !game.isRender;
      }
    });
  }
  update() {
    //will be updated in future
  }
}
