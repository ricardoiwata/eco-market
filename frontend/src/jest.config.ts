import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.ts",
        "^axios$": "<rootDir>/__mocks__/axios.ts"
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};

export default config;