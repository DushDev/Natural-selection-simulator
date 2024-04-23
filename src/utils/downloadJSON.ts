export default function downloadJSON(jsonData: any, filename: string): void {
  // Перетворення JSON у рядок
  const jsonStr = JSON.stringify(jsonData, null, 2);

  // Створення Blob
  const blob = new Blob([jsonStr], { type: "application/json" });

  // Створення URL для Blob
  const url = URL.createObjectURL(blob);

  // Створення посилання
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  // Симуляція кліку на посилання для завантаження файлу
  link.click();

  // Видалення Blob та URL
  URL.revokeObjectURL(url);
}
