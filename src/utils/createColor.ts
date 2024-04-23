export default function createColor(red: number, green: number, blue: number) {
  // Перевірка параметрів
  let max = Math.max(red, green, blue);

  red = 255 * (red / max);
  green = 255 * (green / max);
  blue = 255 * (blue / max);
  // Перетворення в HEX

  return `rgb(${red}, ${green}, ${blue})`;
}
