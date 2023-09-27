/**
 * @type {import('next').NextConfig}
 */

const baseConfig = {
    output: 'standalone',
    reactStrictMode: true,
    images: {
        domains: ['localhost'],
        unoptimized: true,
    },
    async redirects() {
        return [
            {
                source: '/authentication',
                destination: '/authentication/login',
                permanent: true,
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: '/service/:path*',
                destination: 'http://api:3000/:path*',
            },
        ];
    },
};
const devConfig = {
    webpackDevMiddleware: (config) => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        };
        return config;
    },
    experimental: {
        appDir: true,
    },
};
const prodConfig = {};

module.exports = {
    ...baseConfig,
    ...(process.env.NODE_ENV === 'production' ? prodConfig : devConfig),
};
