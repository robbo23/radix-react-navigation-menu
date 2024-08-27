/* eslint-disable unicorn/prefer-module,@typescript-eslint/no-shadow */
import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "tsup";

const silent = false;

const PACKAGE_ROOT_PATH = process.cwd();
const INPUT_FILE_PATH = path.join(PACKAGE_ROOT_PATH, "src/index.ts");
const INPUT_FILE = fs.existsSync(INPUT_FILE_PATH)
  ? INPUT_FILE_PATH
  : path.join(PACKAGE_ROOT_PATH, "src/index.tsx");

export default defineConfig((opts) => {
  return {
    ...opts,
    entry: [INPUT_FILE],
    format: ["esm"],
    dts: true,
    clean: true,
    esbuildOptions(options) {
      options.banner = {
        js: '"use client"',
      };
    },
    ...(silent
      ? {
          silent: true,
          onSuccess: async () => {
            if (opts.watch) {
              console.info("Watching for changes...");
              return;
            }

            console.info("Build succeeded!");
          },
        }
      : {}),
  };
});
