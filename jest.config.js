const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
  testMatch: ['**/?(*.)+test.ts?(x)'],
};
