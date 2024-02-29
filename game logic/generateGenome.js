import getRandomInRange from "../utils/random.js";

export default function generateGenome() {
  let genome = [];
  for (let i = 0; i < 64; i++) {
    genome.push(25); // (Math.round(getRandomInRange(0, 63)));
  }
  return genome;
}
