module.exports = {
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!docs/**/*'],
  setupFilesAfterEnv: ['jest-enzyme'],
  testEnvironment: 'enzyme'
};
