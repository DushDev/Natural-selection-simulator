export default function getRandomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
