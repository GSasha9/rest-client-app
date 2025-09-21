import { describe, it, expect } from 'vitest';
import { serverSearchParamsToObject } from './server-search-params-to-object';

describe('serverSearchParamsToObject', () => {
  it('returns an empty object if undefined is passed', () => {
    expect(serverSearchParamsToObject(undefined)).toEqual({});
  });

  it('copies lines directly', () => {
    const input = { 'Content-Type': 'application/json', Accept: 'text/plain' };
    const output = serverSearchParamsToObject(input);
    expect(output).toEqual(input);
  });

  it('takes the first element of the array if the value is an array', () => {
    const input = { 'X-Test': ['one', 'two'], 'Y-Test': ['only'] };
    const output = serverSearchParamsToObject(input);
    expect(output).toEqual({ 'X-Test': 'one', 'Y-Test': 'only' });
  });

  it('ignores empty arrays and undefined', () => {
    const input = { A: [], B: undefined, C: ['first'] };
    const output = serverSearchParamsToObject(input);
    expect(output).toEqual({ C: 'first' });
  });
});
