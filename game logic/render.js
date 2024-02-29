import game from "../index.js";
import settings from "../settings.js";
import getEnergyColor from "./getEnergyColor.js";

export default class Render {
  constructor(canvas, world) {
    this.canvas = canvas;
    this.canvas.width = settings.width * settings.cageSize;
    this.canvas.height = settings.height * settings.cageSize;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ctx = canvas.getContext("2d");
    this.world = world;
  }
  render(realFps) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let i = 1; i < settings.height; i++) {
      if (i % 8 == 0) {
        // render lines
        this.ctx.beginPath();
        this.ctx.strokeStyle = "rgba(100,100,100,0.5)"; // alpha = 0.5
        this.ctx.moveTo(0, i * this.world.cageSize);
        this.ctx.lineTo(this.width, i * this.world.cageSize);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }
    for (let i in this.world.grid) {
      for (let j in this.world.grid[i]) {
        let cage = this.world.grid[i][j];
        if (cage) {
          if (cage.type == "bot") {
            this.ctx.beginPath();
            if (settings.viewmode === "normal") this.ctx.fillStyle = cage.color;
            else if (settings.viewmode === "energy")
              this.ctx.fillStyle = getEnergyColor(cage.energy);
            else if (settings.viewmode === "specColors")
              this.ctx.fillStyle = cage.specColor;
            this.ctx.fillRect(
              cage.x * this.world.cageSize,
              cage.y * this.world.cageSize,
              this.world.cageSize,
              this.world.cageSize
            );
            this.ctx.closePath();
          } else if (cage.type == "organic") {
            this.ctx.beginPath();
            this.ctx.fillStyle = cage.color;
            this.ctx.fillRect(
              cage.x * this.world.cageSize + 1,
              cage.y * this.world.cageSize + 1,
              this.world.cageSize - 2,
              this.world.cageSize - 2
            );
            this.ctx.closePath();
          }
          // this.ctx.beginPath();
          // this.ctx.lineWidth = 1;
          // this.ctx.strokeStyle = "black";
          // this.ctx.globalAlpha = 0.5; // alpha = 0.5
          // this.ctx.strokeRect(
          //   cage.x * this.world.cageSize,
          //   cage.y * this.world.cageSize,
          //   this.world.cageSize,
          //   this.world.cageSize
          // );
          // this.ctx.globalAlpha = 1; // alpha = 0.5
          // this.ctx.closePath();
        }
      }
    }
    //write realFps in right down corner of canvas
    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(Math.round(realFps), this.width - 50, this.height - 20);
    this.ctx.closePath();
  }
}
