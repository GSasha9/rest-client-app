import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getCssVar } from './getCssVar';

describe('getCssVar', () => {
  let originalWindow: typeof globalThis.window;

  beforeEach(() => {
    originalWindow = globalThis.window;
    document.documentElement.style.cssText = '';
  });

  afterEach(() => {
    Object.defineProperty(globalThis, 'window', {
      value: originalWindow,
      configurable: true,
    });
  });

  it('should return empty string if window is undefined', () => {
    Object.defineProperty(globalThis, 'window', {
      value: undefined,
      configurable: true,
    });

    expect(getCssVar('--test-var')).toBe('');
  });

  it('should return the CSS variable value from :root', () => {
    document.documentElement.style.setProperty('--test-var', '123px');

    const value = getCssVar('--test-var');
    expect(value).toBe('123px');
  });

  it('should trim whitespace from the CSS variable value', () => {
    document.documentElement.style.setProperty('--test-var', '  42px  ');

    const value = getCssVar('--test-var');
    expect(value).toBe('42px');
  });

  it('should return empty string if CSS variable is not set', () => {
    const value = getCssVar('--nonexistent-var');
    expect(value).toBe('');
  });
});
