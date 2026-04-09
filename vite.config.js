import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// 1. Importamos el nuevo plugin de Tailwind
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // 2. Lo metemos en la lista de plugins
  plugins: [react(), tailwindcss()],
});
