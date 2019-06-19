module.exports = function(wallaby) {
  return {
    files: [
      'package.json',
      { pattern: 'jest.config.js', load: true },
      { pattern: 'src/**/*.ts?(x)', load: true },
      { pattern: 'src/**/*.js?(x)', load: true },
      { pattern: 'src/**/*.test.js?(x)', ignore: true },
      { pattern: 'src/**/*.test.ts?(x)', ignore: true }
    ],
    tests: [
      { pattern: 'src/**/*.ts?(x)', load: true },
      { pattern: 'src/**/*.js?(x)', load: true }
    ],
    hints: {
      ignoreCoverage: /istanbul ignore/
    },
    env: {
      type: 'node',
      runner: 'node'
    },
    compilers: {
      '**/*.js?(x)': wallaby.compilers.babel(),
      '**/*.ts?(x)': wallaby.compilers.babel()
    },
    testFramework: 'jest',
    setup: w => {
      const jestConfig = require('./jest.config.js');
      wallaby.testFramework.configure(jestConfig);
    }
  };
};
