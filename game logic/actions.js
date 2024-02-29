import eat from "./actions/eat.js";
import giveEnergy from "./actions/giveEnergy.js";
import howManyEnergyIHave from "./actions/howManyEnergyIHave.js";
import imSurrounded from "./actions/imSurrounded.js";
import mineralsToEnergy from "./actions/mineralsToEnergy.js";
import move from "./actions/move.js";
import photoSynthesis from "./actions/photoSynthesis.js";
import rotate from "./actions/rotate.js";
import spawnChild from "./actions/spawnChild.js";
import watch from "./actions/watch.js";
import whatMyLevel from "./actions/whatMyLevel.js";

const actions = {
  25: photoSynthesis,
  26: move,
  27: eat,
  28: rotate,
  29: watch,
  30: howManyEnergyIHave,
  31: whatMyLevel,
  32: imSurrounded,
  33: spawnChild,
  34: mineralsToEnergy,
  35: giveEnergy,
};

export default actions;
