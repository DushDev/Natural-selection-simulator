export default function mineralsToEnergy(bacteria) {
  bacteria.energy += bacteria.minerals * 4;
  bacteria.energyFromMinerals += bacteria.minerals * 4;
  bacteria.minerals = 0;
  bacteria.programCounter += 1;
  bacteria.iter = 0;
}
