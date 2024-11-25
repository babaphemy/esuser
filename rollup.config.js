import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
export default [
  // commonjs build
  {
    input: "src/index.ts",
    output: {
      file: "dist/bundle.js",
      format: "cjs",
      sourcemap: true,
    },
    external: ["react", "react-dom", "react/jsx-runtime"],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      nodeResolve(),
      commonjs({
        esmExternals: true,
      }),
    ],
  },
  //  es module build
  {
    input: "src/index.ts",
    output: {
      file: "dist/bundle.mjs",
      format: "esm",
      sourcemap: true,
    },
    external: ["react", "react-dom", "react/jsx-runtime"],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      nodeResolve(),
      commonjs(),
    ],
  },
];
