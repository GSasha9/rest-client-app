import { describe, it, expect } from 'vitest';
import { applyVariables } from './apply-variables';

describe('applyVariables', () => {
  it('replaces one variable', () => {
    const result = applyVariables([['name', 'Alice']], 'Hello, {{name}}!');
    expect(result).toBe('Hello, Alice!');
  });
});
