import store from "../app/store";
import Bot from "./bot/bot";
import Simulation from ".";

export default class World {
  grid: (Bot | undefined)[][] = [];
  constructor(public simulation: Simulation) {
    const { controller } = store.getState();
    const { worldWidth, worldHeight } = controller;
    for (let i = 0; i <= worldWidth; i++) {
      this.grid[i] = [];
      for (let j = 0; j <= worldHeight; j++) {
        this.grid[i][j] = undefined;
      }
    }
  }

  refreshGrid() {
    const { controller } = store.getState();
    const { worldWidth, worldHeight } = controller;
    for (let i = 0; i <= worldWidth; i++) {
      this.grid[i] = [];
      for (let j = 0; j <= worldHeight; j++) {
        this.grid[i][j] = undefined;
      }
    }
  }

  spawnBots(amount = 100) {
    const { controller } = store.getState();
    const { worldWidth, worldHeight } = controller;
    for (let i = 0; i < amount; i++) {
      let randomX = Math.floor(Math.random() * worldWidth);
      let randomY = Math.floor(Math.random() * worldHeight);
      if (this.grid[randomX][randomY] === undefined) {
        this.grid[randomX][randomY] = new Bot({
          x: randomX,
          y: randomY,
          simulation: this.simulation,
        });
      }
    }
  }
  update() {
    const { controller } = store.getState();
    const { worldWidth, worldHeight } = controller;
    for (let i = 0; i <= worldWidth; i++) {
      for (let j = 0; j <= worldHeight; j++) {
        let cage = this.grid[i][j];
        if (cage && cage.type === "bot") {
          cage.update();
        }
      }
    }
  }
  clear() {
    const { controller } = store.getState();
    const { worldWidth, worldHeight } = controller;
    for (let i = 0; i < worldWidth; i++) {
      for (let j = 0; j < worldHeight; j++) {
        this.grid[i][j] = undefined;
      }
    }
  }
  move(bot: Bot, toX: number, toY: number) {
    const { controller } = store.getState();
    const { worldWidth } = controller;
    if (toX < 0) toX = worldWidth;
    if (toX > worldWidth) toX = 0;
    if (this.checkPos(toX, toY) === 2) {
      this.grid[toX][toY] = bot;
      this.grid[bot.x][bot.y] = undefined;
      bot.x = toX;
      bot.y = toY;
    }
  }
  checkPos(x: number, y: number): number {
    const { controller } = store.getState();
    const { worldWidth, worldHeight } = controller;
    if (x < 0) x = worldWidth - 1;
    if (x > worldWidth - 1) x = 0;
    if (y < 1 || y >= worldHeight) return 3; // стена
    if (this.getGrid(x, y) === undefined) return 2; // пусто
    if (this.getGrid(x, y)!.type === "organic") return 4;
    if (this.getGrid(x, y)!.type === "bot") return 5;
    return 2;
  }

  getGrid(x: number, y: number) {
    const { controller } = store.getState();
    const { worldWidth } = controller;
    if (x < 0) x = worldWidth - 1;
    if (x > worldWidth - 1) x = 0;
    return this.grid[x][y];
  }
  setGrid(
    x: number,
    y: number,
    data: undefined | Bot
  ): { x: number; y: number } {
    const { controller } = store.getState();
    const { worldWidth } = controller;
    if (x < 0) x = worldWidth - 1;
    if (x > worldWidth - 1) x = 0;
    this.grid[x][y] = data;
    return { x, y };
  }
}
