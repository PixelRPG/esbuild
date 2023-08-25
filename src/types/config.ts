import { AssetsConfig } from "./assets-config.js";
import type { ServeOptions, BuildOptions } from "esbuild";

export interface Config {
  root: string;
  esbuild: BuildOptions;
  serve: ServeOptions;
  assets: AssetsConfig;
}
