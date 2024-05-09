import { glsl } from "esbuild-plugin-glsl";
import { transformExtPlugin } from "@gjsify/esbuild-plugin-transform-ext";
import { Environment, AssetsConfig, Config } from "./types/index.js";
import process from 'node:process';

import type { ServeOptions, BuildOptions } from "esbuild";

export const getConfig = (env: Environment): Config => {
  env.development = env.development || !env.production;
  env.production = env.production || !env.development;

  const root = process.cwd();

  const esbuild: BuildOptions = {
    plugins: [
      transformExtPlugin({ outExtension: { ".ts": ".js" } }),
      glsl({
        minify: true
      })
    ],
    entryPoints: ["src/main.ts"],
    bundle: true,
    minify: env.production,
    outdir: env.outdir,
    outfile: env.outfile,
    loader: { ".png": "file", ".tmx": "file", ".html": "file", ".json": "file" },
    platform: "browser",
    target: "esnext",
    format: "esm",
    mainFields: ["module", "main"],
    sourcemap: env.development,
    define: {
      global: "window",
      // Needed to build excalibur
      // "process.env.__EX_VERSION": "'0.0.1-custom'" // TODO
    },
    external: ["jsdom"]
  };

  if (!esbuild.outdir) {
    delete esbuild.outdir;
  }
  if (!esbuild.outfile) {
    delete esbuild.outfile;
  }

  const serve: ServeOptions = {
    servedir: "./dist",
    port: env.port,
  };

  const assets: AssetsConfig = {
    tilemaps: {
      indir: "./src/assets/tilemaps/",
      outdir: "./dist/assets/tilemaps/",
    },
    tilesets: {
      indir: "./src/assets/tilesets/",
      outdir: "./dist/assets/tilesets/",
    },
  };

  return {
    root,
    esbuild,
    serve,
    assets,
  };
};
