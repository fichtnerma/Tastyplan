/**
 * @type {import('next').NextConfig}
 */

module.exports = {
    webpackDevMiddleware: (config) => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        };
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: '**',
                hostname: '**',
            },
        ],
        domains: ['localhost'],
        unoptimized: true,
    },
    reactStrictMode: true,
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
