import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base relativa: el build funciona en GitHub Pages, Netlify o Vercel sin tocar nada
export default defineConfig({
  base: "./",
  plugins: [react()],
  server: { port: 5173 },
});
