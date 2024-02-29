export default function rotate(bacteria) {
  bacteria.align += bacteria.genome[bacteria.programCounter + 1] % 8;
  bacteria.align %= 8;
  bacteria.energy -= 1;
  bacteria.programCounter += 1;
}
