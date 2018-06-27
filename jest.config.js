module.exports = {
  globals: {
    "ts-jest": {
      "tsConfigFile": "tsconfig.json"
    }
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js"
  ],
  testMatch: [
    "**/__tests__/*.+(ts|tsx|js)"
  ]
};