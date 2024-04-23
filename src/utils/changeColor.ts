import getRandomInRange from "./random";

export default function changeColor(rgbColor: string): string {
  // Перевірка, чи вхідний рядок має правильний формат RGB
  const rgbRegex = /^rgb\((\s*\d{1,3}\s*),(\s*\d{1,3}\s*),(\s*\d{1,3}\s*)\)$/i;
  if (!rgbRegex.test(rgbColor)) {
    throw new Error(
      "Неправильний формат кольору. Введіть колір у форматі RGB."
    );
  }

  // Витягнення складових кольору
  const match = rgbColor.match(rgbRegex);
  if (!match) {
    throw new Error(
      "Неправильний формат кольору. Введіть колір у форматі RGB."
    );
  }
  let r = parseInt(match[1].trim());
  let g = parseInt(match[2].trim());
  let b = parseInt(match[3].trim());

  // Зміна кожного каналу кольору на випадкову величину в межах від -15 до 15
  r = Math.max(0, Math.min(255, r + getRandomInRange(-15, 15)));
  g = Math.max(0, Math.min(255, g + getRandomInRange(-15, 15)));
  b = Math.max(0, Math.min(255, b + getRandomInRange(-15, 15)));

  // Повертаємо змінений колір у форматі RGB
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}
