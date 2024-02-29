import game from "../index.js";
import settings from "../settings.js";
import Bot from "./bacteria.js";
import compareGenomes from "./genomesCompasion.js";

/**
 * Class of world
 */
export default class World {
  grid = [];
  cageSize = settings.cageSize;
  population = 0;
  constructor() {
    for (let i = 0; i <= settings.width; i++) {
      this.grid[i] = [];
      for (let j = 0; j <= settings.height; j++) {
        this.grid[i][j] = undefined;
      }
    }
  }

  checkPos(bacteria, x, y) {
    // if (x < 0) x = this.width - 1;
    // if (x >= this.width) x = 0;
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return 3; // стена
    if (this.grid[x][y] === undefined) return 2; // пусто
    if (this.grid[x][y].type === "organic") return 4;
    if (this.grid[x][y].type === "bot") {
      if (compareGenomes(this.grid[x][y].genome, bacteria.genome)) return 6;
      return 5;
    }
  }

  spawnBots(count = 10) {
    for (let i = 0; i < count; i++) {
      let randomX = Math.floor(Math.random() * settings.width);
      let randomY = Math.floor(Math.random() * settings.height);
      if (this.grid[randomX][randomY] === undefined) {
        this.grid[randomX][randomY] = new Bot(randomX, randomY);
        this.grid[randomX][randomY].color = "green";
      }
    }
  }

  clear() {
    for (let i = 0; i < settings.width; i++) {
      for (let j = 0; j < settings.height; j++) {
        this.grid[i][j] = undefined;
      }
    }
  }

  update() {
    this.population = 0;
    for (let i = 0; i < settings.width; i++) {
      for (let j = 0; j < settings.height; j++) {
        let cage = this.grid[i][j];
        if (cage && (cage.type === "bot" || cage.fall === true)) {
          this.population++;
          cage.update();
        }
      }
    }
  }
  move(bacteria, toX, toY) {
    if (toX < 0) toX = this.width - toX;
    if (toX >= this.width) toX = 0;
    if (this.checkPos(this.grid[x][y]) === 2) {
      this.grid[toX][toY] = bacteria;
      this.grid[bacteria.x][bacteria.y] = undefined;
      bacteria.x = toX;
      bacteria.y = toY;
    }
  }
  superUpdate() {
    for (let i = 0; i < settings.width; i++) {
      for (let j = 0; j < settings.height; j++) {
        let cage = this.grid[i][j];
        if (cage && cage.type === "bot") {
          cage.superUpdate();
        }
      }
    }
  }
}
