import { defineConfig, createLogger, type LogOptions } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { ValidateEnv } from '@julr/vite-plugin-validate-env'
import { fileURLToPath } from 'url'

const logger = createLogger()
const originalInfo = logger.info

logger.info = (msg: string, options?: LogOptions) => {
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
      // mkcert(),
      react(),
      tailwindcss(),
      ValidateEnv({
        configFile: './src/env'
      })
    ],
    root: 'src',
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      sourcemap: mode === 'development'
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 3000,
    }
  }
})
