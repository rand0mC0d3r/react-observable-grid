import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import external from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: './src/index.js',
    output: [
      {
        dir: 'dist/',
        format: 'es',
        exports: 'named',
      },
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react'],
        babelHelpers: 'bundled',
      }),
      resolve(),
      commonjs(),
      external(),
      terser({ numWorkers: 2 }),
    ],
  },
]