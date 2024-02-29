export default function howManyEnergyIHave(bacteria) {
  if (bacteria.energy > bacteria.genome[bacteria.programCounter + 1] * 15) {
    bacteria.programCounter += bacteria.genome[bacteria.programCounter + 2];
  } else {
    bacteria.programCounter += bacteria.genome[bacteria.programCounter + 3];
  }
}
