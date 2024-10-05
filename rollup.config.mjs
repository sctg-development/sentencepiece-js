import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { wasm } from '@rollup/plugin-wasm';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

export default [
    {
        input: 'src/index.ts',
        output: {
            dir: 'dist',
            format: 'cjs'
        },
        plugins: [nodeResolve({ browser: true }), commonjs(), wasm(), typescript({ target: "es5", downlevelIteration: true })]
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.d.ts',
            format: 'es'
        },
        plugins: [dts()]
    }
];