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
};
