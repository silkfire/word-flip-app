import { defineConfig, createLogger } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath } from 'url'

const logger = createLogger()
const originalInfo = logger.info

logger.info = (msg, options) => {
  if (options?.timestamp) {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false })
    originalInfo(`\x1b[2m${time}\x1b[22m ${msg}`, { ...options, timestamp: false })
  } else {
    originalInfo(msg, options)
  }
}

export default defineConfig(({ mode }) => {
  return {
    customLogger: logger,
    plugins: [
      react()
    ],
    root: 'src',
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      sourcemap: mode === 'development'
    },
    // envDir: '../',
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 3000,
    }
  }
})
