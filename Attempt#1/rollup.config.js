import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";



export default {
  input: "index.js",
  output: {
    file: "gramjs.bundle.js",
    format: "umd",
    name: "GramJS"
  },
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs(),
    terser()
  ]
};
