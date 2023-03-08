/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['<rootDir>/node_modules'],
  modulePathIgnorePatterns: ['<rootDir>/__tests__'],
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
  },
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
    '\\.(gif|png|svg|css|ico)$': '<rootDir>/__tests__/mocks/fileTransformer.js',
  },
};
