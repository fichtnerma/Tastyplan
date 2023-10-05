const path = require('path');
const withPWAInit = require('next-pwa');

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
const generateAppDirEntry = (entry) => {
    const packagePath = require.resolve('next-pwa');
    const packageDirectory = path.dirname(packagePath);
    const registerJs = path.join(packageDirectory, 'register.js');

    return entry().then((entries) => {
        // Register SW on App directory, solution: https://github.com/shadowwalker/next-pwa/pull/427
        if (entries['main-app'] && !entries['main-app'].includes(registerJs)) {
            if (Array.isArray(entries['main-app'])) {
                entries['main-app'].unshift(registerJs);
            } else if (typeof entries['main-app'] === 'string') {
                entries['main-app'] = [registerJs, entries['main-app']];
            }
        }
        return entries;
    });
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

// const prodConfig = require('next-pwa')({
//     dest: 'public',
//     buildExcludes: ['app-build-manifest.json'],
// });

const prodConfig = {
    webpack: (config) => {
        const entry = generateAppDirEntry(config.entry);
        config.entry = () => entry;

        return config;
    },
};

/** @type {import('next-pwa').PWAConfig} */
const withPWA = withPWAInit({
    dest: 'public',
    // Solution: https://github.com/shadowwalker/next-pwa/issues/424#issuecomment-1399683017
    buildExcludes: ['app-build-manifest.json'],
});

module.exports = {
    ...baseConfig,
    ...(process.env.NODE_ENV === 'production' ? withPWA(prodConfig) : devConfig),
};
