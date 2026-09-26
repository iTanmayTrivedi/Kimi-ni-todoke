import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig, loadEnv, type PluginOption } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command, mode }) => {
  const loadedEnvironment = loadEnv(mode, process.cwd(), "VITE_");
  const environmentDefinitions = Object.fromEntries(
    Object.entries(loadedEnvironment).map(([key, value]) => [
      `import.meta.env.${key}`,
      JSON.stringify(value),
    ]),
  );

  const plugins: PluginOption[] = [
    tailwindcss(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      server: { entry: "server" },
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
    }),
    command === "build"
      ? nitro({
          preset: "cloudflare-module",
          output: {
            dir: "dist",
            serverDir: "dist/server",
            publicDir: "dist/client",
          },
          cloudflare: {
            nodeCompat: true,
            deployConfig: true,
          },
        })
      : undefined,
    react(),
  ];

  return {
    plugins,
    define: environmentDefinitions,
    css: { transformer: "lightningcss" },
    server: {
      host: "0.0.0.0",
      port: 8080,
      strictPort: true,
    },
  };
});
