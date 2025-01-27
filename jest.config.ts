import type {Config} from 'jest';

const config: Config = {
  preset: "jest-expo",
  verbose: true,
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/svg.js',
  },
};

export default config;