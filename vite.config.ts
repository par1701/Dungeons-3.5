import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Se publica en GitHub Pages bajo /Dungeons-3.5/, por eso el base en producción.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/Dungeons-3.5/' : '/',
}))
