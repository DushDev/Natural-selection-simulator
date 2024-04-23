import eat from "./actions/eat";
import giveEnergy from "./actions/giveEnergy";
import howManyEnergyIHave from "./actions/howManyEnergyIHave";
import imSurrounded from "./actions/imSurrounded";
import mineralsToEnergy from "./actions/mineralsToEnergy";
import move from "./actions/move";
import photoSynthesis from "./actions/photoSynthesis";
import rotate from "./actions/rotate";
import spawnChild from "./actions/spawnChild";
import watch from "./actions/watch";
import whatMyLevel from "./actions/whatMyLevel";

const actions: any = {
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
