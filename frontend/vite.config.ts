import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  // @ts-ignore
  test: {
    globals: true,         // Allows global functions like describe/it
    environment: 'jsdom',  // Use jsdom for DOM simulation
    include: ['src/**/*.{test,spec}.js'], // Specify test file patterns
    setupFiles: './src/setupTests.js', // Optional setup for global mocks or configurations
  },
});