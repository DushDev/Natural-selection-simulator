export default function rgbToHex(red, green, blue) {
  // Перевірка параметрів
  let max = Math.max(red, green, blue);

  red = 255 * (red / max);
  green = 255 * (green / max);
  blue = 255 * (blue / max);
  // Перетворення в HEX

  return `rgb(${red}, ${green}, ${blue})`;
}
