export default function whatMyLevel(bacteria) {
  if (bacteria.y > bacteria.genome[bacteria.programCounter + 1] * 2.2) {
    bacteria.programCounter += bacteria.genome[bacteria.programCounter + 2];
  } else {
    bacteria.programCounter += bacteria.genome[bacteria.programCounter + 3];
  }
}
