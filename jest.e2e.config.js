/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  displayName: 'E2E',
  testMatch: ['**/*.e2e.test.ts', '**/*.e2e.spec.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(ts)?$': ['ts-jest', { isolatedModules: true }],
  },
};
