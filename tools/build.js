const fs = require('fs');
const path = require('path');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('uglify-js');

const name = process.env.npm_package_name;
const configs = [
  {
    file: `dist/${name}.umd.js`,
    env: 'production',
    format: 'umd',
    name: 'VueI18nLight',
  },
  {
    file: `dist/${name}.esm.js`,
    format: 'esm',
  },
];

const buildEntry = (config) => {
  rollup
    .rollup({
      input: 'src/index.js',
      plugins: [
        babel(),
      ],
    })
    .then((bundle) => bundle.generate(config))
    .then(({ code }) => {
      if (config.env === 'production') {
        return uglify.minify(code, {
          output: {
            ascii_only: true
          },
          compress: {
            pure_funcs: ['makeMap']
          }
        }).code;
      } else {
        return code;
      }
    })
    .then((code) => {
      const dest = config.file;
      fs.writeFile(dest, code, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`${path.relative(process.cwd(), dest)} ${(code.length/1024).toFixed(2)}kb`)
        }
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

[
  {
    file: `dist/${name}.common.js`,
    format: 'cjs',
  },
  {
    file: `dist/${name}.min.js`,
    env: 'production',
    format: 'umd',
    name: 'VueI18nLight',
  },
  {
    file: `dist/${name}.esm.js`,
    format: 'es',
  },
].forEach(buildEntry);