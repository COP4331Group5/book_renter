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
    },
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "placehold.co",
                port: "",
                pathname: "/**"
            }
        ]
    }
};

module.exports = nextConfig;
