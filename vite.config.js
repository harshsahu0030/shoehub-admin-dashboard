import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/v1": {
        target: import.meta.env.VITE_BASE_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
