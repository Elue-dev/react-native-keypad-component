module.exports = {
  preset: 'react-native',
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@testing-library|react-clone-referenced-element)/)',
  ],
  testPathIgnorePatterns: ['/lib/', '\\.d\\.ts$'],
};
