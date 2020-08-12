module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/pages/login/index.vue'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  testRegex: '(<rootDir>/test/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  globals: {
    'ts-jest': {
      babelConfig: '.babelrc',
    },
  },
};
