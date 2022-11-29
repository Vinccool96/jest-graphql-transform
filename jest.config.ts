import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["js", "json", "ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^~/(.*)$": "<rootDir>/$1",
  },
  transform: {
    "\\.(gql|graphql)$": "./dist/index.js",
    "\\.ts$": "ts-jest",
    ".*": "babel-jest",
  },
}

export default config
