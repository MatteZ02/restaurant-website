import { resolve } from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                admin: resolve(__dirname, "admin/index.html"),
                menu: resolve(__dirname, "menu/index.html"),
                cart: resolve(__dirname, "cart/index.html"),
                order: resolve(__dirname, "order/index.html"),
                docs: resolve(__dirname, "docs/index.html"),
            },
        },
        outDir: "dist",
    },
    plugins: [
        VitePWA({
            registerType: "autoUpdate",
            devOptions: {
                enabled: true,
            },
            workbox: {
                globPatterns: ["**/*.{js,css,html,ttf,png}"],
            },
        }),
    ],
    base: "/",
});
