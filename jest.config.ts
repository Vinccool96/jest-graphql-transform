import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^~/(.*)$": "<rootDir>/$1",
  },
  extensionsToTreatAsEsm: [".ts"],
  moduleFileExtensions: ["js", "ts", "json"],
  transform: {
    "\\.(j|t)s$": "ts-jest",
    "\\.(gql|graphql)$": "<rootDir>/dist/index.js",
  },
  moduleDirectories: ["node_modules"],
  verbose: true,
}

export default config
