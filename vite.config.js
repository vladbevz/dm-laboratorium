import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  assetsInclude: ["**/*.JPG", "**/*.JPEG"],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          "framer-motion": ["framer-motion"],
          "lucide-react": ["lucide-react"],
        },
      },
      // Явно укажите резолвер для lucide-react
      external: [],
    },
  },
  // Добавьте это для Vercel
  optimizeDeps: {
    include: ["lucide-react", "framer-motion"],
    exclude: [],
  },
  // Разрешите все хосты для Vercel
  server: {
    host: true,
    port: 3000,
    strictPort: true,
  },
  preview: {
    host: true,
    port: 3000,
  },
});
