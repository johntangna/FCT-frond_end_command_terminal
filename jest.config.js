module.exports = {
  preset: "ts-jest",
  testPathPattern: ["tests/fsUtil.spec.ts"],
  testMatch: ["<rootDir>/tests/*.(spec|test).ts?(x)"],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
}