const path = require("path");

const buildEslintCommand = (filenames) =>
    `next lint --file ${filenames
        .map((f) => path.relative(process.cwd(), f))
        .join(" --file ")}`;

const buildPrettierCommand = (filenames) =>
    `prettier ${filenames
        .map((f) => path.relative(process.cwd(), f))
        .join(" ")} --check`;

module.exports = {
    "**/*": [buildPrettierCommand],
    "*.{js,jsx,ts,tsx}": [buildEslintCommand]
};
