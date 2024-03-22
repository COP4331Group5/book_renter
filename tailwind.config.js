/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: "rgb(147 44 32 / <alpha-value>)",
                "primary-light": "rgb(167 58 37 / <alpha-value>)",
                "primary-dark": "rgb(102 0 0 / <alpha-value>)",
                background: {
                    light: "rgb(250 249 246 / <alpha-value>)",
                    dark: "rgb(21 21 25 / <alpha-value>)"
                },
                farground: {
                    light: "rgb(255 255 255 / <alpha-value>)",
                    dark: "rgb(14 14 18 / <alpha-value>)"
                },
                shadow: {
                    light: "rgb(190 190 190 / <alpha-value>)",
                    dark: "rgb(5 5 5 / <alpha-value>)"
                },
                highlight: {
                    light: "rgb(235 235 235 / <alpha-value>)",
                    dark: "rgb(45 44 53 / <alpha-value>)"
                }
            }
        }
    }
};
