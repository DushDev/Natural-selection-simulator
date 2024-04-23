import store from "../app/store";
import Simulation from "../simulation";
import getEnergyColor from "../utils/getEnergyColor";

export default class Render {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null = null;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = this.canvas.getContext("2d");
    if (context !== null) {
      this.ctx = context;
    }
  }
  render(simulation: Simulation) {
    if (!this.ctx) return;
    const { controller } = store.getState();
    const {
      worldWidth: width,
      worldHeight: height,
      cageSize,
      renderMode,
    } = controller;
    if (renderMode === "none") return;
    this.ctx.clearRect(0, 0, width * cageSize, height * cageSize);
    // for (let i = 1; i < height; i++) {
    //   if ((i % 8) * cageSize == 0) {
    //     // render lines
    //     this.ctx.beginPath();
    //     this.ctx.strokeStyle = "rgba(200,200,200,0.5)"; // alpha = 0.5
    //     this.ctx.moveTo(0, i * cageSize);
    //     this.ctx.lineTo(width * cageSize, i * cageSize);
    //     this.ctx.stroke();
    //     this.ctx.closePath();
    //   }
    // }
    for (let i in simulation.world.grid) {
      for (let j in simulation.world.grid[i]) {
        let cage = simulation.world.grid[i][j];
        if (cage) {
          if (cage.type == "bot") {
            // console.log('bot')
            this.ctx.beginPath();
            if (renderMode === "normal") this.ctx.fillStyle = cage.color;
            else if (renderMode === "energy")
              this.ctx.fillStyle = getEnergyColor(cage.energy);
            else if (renderMode === "species")
              this.ctx.fillStyle = cage.speciesColor;
            this.ctx.fillRect(
              cage.x * cageSize,
              cage.y * cageSize,
              cageSize,
              cageSize
            );
            this.ctx.closePath();
          } else if (cage.type == "organic") {
            this.ctx.beginPath();
            this.ctx.fillStyle = "gray";
            this.ctx.fillRect(
              cage.x * cageSize + 1,
              cage.y * cageSize + 1,
              cageSize - 2,
              cageSize - 2
            );
            this.ctx.closePath();
          }
        }
      }
    }
    //write realFps in right down corner of canvas
    // this.ctx.beginPath();
    // this.ctx.fillStyle = "white";
    // this.ctx.font = "20px Arial";
    // this.ctx.fillText(
    //   `${Math.round(simulation.ups)}`,
    //   width * cageSize - 50,
    //   height * cageSize - 20
    // );
    // this.ctx.closePath();
  }
}
