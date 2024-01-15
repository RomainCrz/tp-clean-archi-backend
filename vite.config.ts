import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import path from "path"
import react from "@vitejs/plugin-react"

export default defineConfig({
    server: {
        // vite server configs, for details see [vite doc](https://vitejs.dev/config/#server-host)
        port: 3000,
    },
    plugins: [
        ...VitePluginNode({
            adapter: 'express',
            appPath: './src/index.ts',
            exportName: 'viteNodeApp',
            tsCompiler: 'esbuild'
        }),
        react()
    ],
    resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
    build: {
        target: 'esnext',
        copyPublicDir: false
    },
});
