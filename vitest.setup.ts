import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { server } from './src/test-utils/mocks/setup-server';

expect.extend(matchers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
  cleanup();
});
