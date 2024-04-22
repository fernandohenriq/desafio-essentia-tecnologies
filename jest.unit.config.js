/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  displayName: 'Unit',
  testMatch: ['**/*.test.ts', '**/*.spec.ts'],
  testPathIgnorePatterns: ['/node_modules/', '\\.e2e\\.test\\.ts$', '\\.e2e\\.spec\\.ts$'],
  transform: {
    '^.+\\.(ts)?$': ['ts-jest', { isolatedModules: true }],
  },
};
