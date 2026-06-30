import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 54173, strictPort: true },
  preview: { port: 54174, strictPort: true }
});
