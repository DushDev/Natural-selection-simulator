import store from "../../app/store";
import getRandomInRange from "../../utils/random";

const { controller } = store.getState();
const { genomeLength } = controller;

export default class GenomeManager {
  static generateGenome() {
    let genome = [];
    for (let i = 0; i < genomeLength; i++) {
      genome[i] = Math.round(getRandomInRange(0, genomeLength - 1));
    }
    return genome;
  }

  static mutateGenome(genome: number[]) {
    let newgenome = [...genome];
    newgenome[Math.round(getRandomInRange(0, genomeLength - 1))] = Math.round(
      getRandomInRange(0, genomeLength - 1)
    );

    return newgenome;
  }

  static compareGenomes(genome1: number[], genome2: number[]) {
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
}
