import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/comic/",
  plugins: [react()],
  server: {
    allowedHosts: ["pedantesque-acknowledgingly-brenden.ngrok-free.dev"],
  },
});
