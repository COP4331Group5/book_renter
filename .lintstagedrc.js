const path = require("path");

const buildEslintCommand = (filenames) =>
    `next lint --file ${filenames
        .map((f) => path.relative(process.cwd(), f))
        .join(" --file ")}`;

const buildPrettierCommands = (filenames) =>
    filenames.map((f) => `prettier --check '${f}'`);

const buildStylelintCommands = (filenames) =>
    filenames.map((f) => `stylelint "${f}"`);

module.exports = {
    "**/*": [buildPrettierCommands],
    "*.{css,scss}": [buildStylelintCommands],
    "*.{js,jsx,ts,tsx}": [buildEslintCommand]
};
