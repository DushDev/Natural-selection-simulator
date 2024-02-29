/**
 * Сравнивает 2 генома
 * @param {*} genome1
 * @param {*} genome2
 * @returns если они отличаются только на 1 байт то true, если больше то false
 */
export default function compareGenomes(genome1, genome2) {
  // Кількість відмінностей
  let differences = 0;

  // Перевірка елементів масивів
  for (let i = 0; i < genome1.length; i++) {
    if (genome1[i] !== genome2[i]) {
      differences++;
    }

    // Якщо відмінностей більше 2, зупиняємо цикл
    if (differences >= 2) {
      return false;
    }
  }

  // Повернення результату
  return differences < 2;
}
