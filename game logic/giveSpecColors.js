import game from "../index.js";
import settings from "../settings.js";
import compareGenomes from "./genomesCompasion.js";

export default function giveSpecColors() {
    let genomesList = [];
    let colorsList = [];
  for (let i = 0; i <= settings.width; i++) {
    for (let j = 0; j <= settings.height; j++) {
      if (game.world.grid[i][j]) {
        if (game.world.grid[i][j].type === "bot") {
          let ae = genomesList.filter((e) =>
            compareGenomes(e, game.world.grid[i][j].genome)
          );
          if (ae.length > 0) {
            game.world.grid[i][j].specColor =
              colorsList[genomesList.indexOf(ae[0])];
          } else {
            genomesList.push(game.world.grid[i][j].genome);
            let color = `rgb(${Math.round(Math.random() * 255)},${Math.round(
              Math.random() * 255
            )},${Math.round(Math.random() * 255)})`;
            game.world.grid[i][j].specColor = color;
            colorsList.push(color);
            // console.log(colorsList);
          }
        }
      }
    }
  }
}
