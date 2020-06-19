const join = require("path").join;
const tailwindJS = join(__dirname, "tailwind.config.js");
const purgecss = require("@fullhuman/postcss-purgecss");
const cssnano = require('cssnano')

const purgeCssPaths = [
    './**/*.html',
    './**/*.php',
    '*/**/*.html',
    '*/**/*.php',
    '**/*.html',
    '**/*.php',
    '*.html',
    '*.php'
];

const plugins = [
    require("tailwindcss")(tailwindJS),
    require("autoprefixer")
];

if (process.env.NODE_ENV === "production") {
    plugins.push(
        cssnano({
            preset: 'default'
        }),
        purgecss({
            content: purgeCssPaths,
            defaultExtractor: content =>
                content.match(/[A-Za-z0-9-_:\/]+/g) || []
        })
    );
}

module.exports = {
    plugins
};