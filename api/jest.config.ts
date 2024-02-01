import type { Config } from 'jest';
const config: Config = {
    rootDir: './',
    roots: ['<rootDir>/src'],
    moduleFileExtensions: ['js', 'json', 'ts'],
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s', '!**/__tests__/**', '!**/*.test.(t|j)s', '!**/*.spec.(t|j)s'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '.*\\.queries\\.ts$',
        '.*\\.module\\.ts$',
        '.*\\.strategy\\.ts$',
        '.*\\.health\\.ts$',
        '.*\\.dto\\.ts$',
        'main.ts',
        'src/app.service.ts',
        'src/app.controller.ts',
        'src/types/types.ts',
    ],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
    reporters: ['default', 'jest-junit'],
    moduleDirectories: ['node_modules', '<rootDir>'],
    runner: 'groups',
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
    },
    setupFiles: ['./jest.setup.js'],
};
export default config;
