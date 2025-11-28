import { $ } from 'bun';

export async function build() {
  // Clean dist
  await $`rm -rf ./dist`;

  // Build React app
  const result = await Bun.build({
    entrypoints: ['./src/index.js'],
    outdir: './dist',
    minify: true,
    target: 'browser',
  });

  if (!result.success) {
    console.error("Build failed");
    for (const message of result.logs) {
      console.error(message);
    }
    return;
  }

  // Copy assets
  await Bun.write('./dist/index.html', Bun.file('./src/index.html'));
  await Bun.write('./dist/favicon.ico', Bun.file('./src/favicon.ico'));
  await Bun.write('./dist/favicon.png', Bun.file('./src/favicon.png'));

  console.log("Build complete!");
}

if (import.meta.main) {
  await build();
}
