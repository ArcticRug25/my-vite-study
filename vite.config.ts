import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: path.join(__dirname, 'public'),
  root: path.join(__dirname, 'src'),
  plugins: [react()]
})
