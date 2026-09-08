import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const strapiProxy = {
  target: "https://admin.everviehealth.in",
  changeOrigin: true,
  rewrite: (p) => p.replace(/^\/cms/, ""),
};

export default defineConfig({
  plugins: [react()],
  server: { port: 54173, strictPort: true, proxy: { "/cms": strapiProxy } },
  preview: { port: 54174, strictPort: true, proxy: { "/cms": strapiProxy } }
});
