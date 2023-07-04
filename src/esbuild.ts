import esbuild from "esbuild";
import { Config, Environment } from "./types";

export const run = async (env: Environment, config: Config) => {
  if (env.serve) {
    console.info(`Serve on http://localhost:${config.serve.port}`);
    let ctx = await esbuild.context(config.esbuild);
    return ctx.serve(config.serve);
  } else {
    const result = await esbuild.build(config.esbuild);
    console.info(
      `Build done: ${config.esbuild.outdir || config.esbuild.outfile}`
    );
    return result;
  }
};
