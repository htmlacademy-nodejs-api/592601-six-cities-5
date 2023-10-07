import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

// взять путь модуля
export function getCurrentModuleDirectoryPath() {
  // import.meta.url - полный путь
  // fileURLToPath - отсекает переднюю часть, типа file:://
  // dirname - отсекает последнюю часть, в нашем случае это - file-system.ts (имя файла)
  // в модульной системе commonjs есть отдельная переменная, которая была бы доступна в любой функции __dirname
  // так как мы используем ECMAScript, то нам доступна путь через import.meta.url

  const filepath = fileURLToPath(import.meta.url);
  return dirname(filepath);
}
