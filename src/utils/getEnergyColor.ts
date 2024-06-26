export default function getEnergyColor(value: number): string {
  // Перевірка значення
  if (value > 1000) value = 1000;

  // Розрахунок RGB-компонентів
  const red = Math.round((255 * value) / 1000);
  const green = Math.round(255 * (1 - value / 1000));
  const blue = 0;

  // Перетворення в HEX
  const hexRed = red.toString(16).padStart(2, "0");
  const hexGreen = green.toString(16).padStart(2, "0");
  const hexBlue = blue.toString(16).padStart(2, "0");

  // Формування HEX-коду
  const hexColor = "#" + hexRed + hexGreen + hexBlue;

  return hexColor;
}
