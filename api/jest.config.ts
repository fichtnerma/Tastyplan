import type { Config } from 'jest';
const config: Config = {
    rootDir: '.',
    roots: ['<rootDir>/src'],
    moduleFileExtensions: ['js', 'json', 'ts'],
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s', '!**/__tests__/**', '!**/*.test.(t|j)s', '!**/*.spec.(t|j)s'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '.*\\.controller\\.ts$',
        '.*\\.queries\\.ts$',
        '.*\\.module\\.ts$',
        '.*\\.dto\\.ts$',
        'main.ts',
        'src/app.service.ts',
        'src/types/types.ts',
    ],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
    reporters: ['default', 'jest-junit'],
    moduleDirectories: ['node_modules', '<rootDir>'],
    runner: 'groups',
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/$1',
    },
    setupFiles: ['../jest.setup.js'],
};
export default config;
