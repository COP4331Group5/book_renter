const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, ctx) => {
        if (ctx.dev) {
            config.watchOptions = {
                poll: 1000,
                aggregateTimeout: 300
            };
        }

        return config;
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")]
    }
};

module.exports = nextConfig;
