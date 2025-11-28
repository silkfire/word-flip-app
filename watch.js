import { build } from './build.js';
import { watch } from 'fs';

console.log("Starting watcher...");
await build();

let isBuilding = false;

watch('./src', { recursive: true }, async (event, filename) => {
  if (isBuilding) return;
  isBuilding = true;
  
  console.log(`Detected change in ${filename}, rebuilding...`);
  try {
    await build();
  } catch (e) {
    console.error(e);
  } finally {
    isBuilding = false;
  }
});
