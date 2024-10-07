import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import { wasm } from "@rollup/plugin-wasm";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { splitVendorChunkPlugin } from 'vite';

export default [
  {
    input: "src/index.ts",
    output: [
      {
        dir: "dist",
        format: "es",
      },
      { file: "dist/index.cjs", format: "cjs" },
    ],
    plugins: [
      splitVendorChunkPlugin(),
      nodeResolve({ browser: true }),
      commonjs(),
      babel({ babelHelpers: "bundled" }),
      wasm(),
      typescript({ target: "es6", downlevelIteration: true }),
    ],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.d.ts",
      format: "es",
    },
    plugins: [dts()],
  },
];
