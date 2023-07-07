import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { getConfig } from "./config";
import { Environment } from "./types";
import { run } from "./esbuild";

const start = async () => {
  const argv = await yargs(hideBin(process.argv))
    .option("dev", {
      alias: "d",
      type: "boolean",
      description: "Development mode",
      default: true,
    })
    .option("serve", {
      alias: "s",
      type: "boolean",
      description: "Start the server",
      default: false,
    })
    .option("port", {
      alias: "p",
      type: "number",
      description: "Port to start the server",
      default: 8080,
    })
    .option("watch", {
      alias: "w",
      type: "boolean",
      description: "Watch files",
      default: false,
    })
    .option("outdir", {
      alias: "dir",
      type: "string",
      description: "Watch files",
      default: undefined,
    })
    .option("outfile", {
      alias: "o",
      type: "string",
      description: "Watch files",
      default: undefined,
    }).argv;

  const env: Environment = {
    development: argv.dev,
    production: !argv.dev,
    outdir: argv.outdir,
    outfile: argv.outfile,
    watch: argv.watch,
    serve: argv.serve,
    port: argv.port,
  };

  const config = getConfig(env);

  try {
    await run(env, config);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
