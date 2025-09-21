import { renderHook, act } from '@testing-library/react';
import { useRestfulUrl } from './restful-url';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import * as variablesHook from './variables';
import { encodeBase64 } from '../utils/encode-base64';
import { Mock, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('./variables', () => ({
  useVariables: vi.fn(),
}));

describe('useRestfulUrl', () => {
  const mockReplace = vi.fn();
  const mockVariables = [['foo', 'bar']];

  beforeEach(() => {
    const encodedUrl = encodeBase64('hello');
    const encodedBody = encodeBase64(JSON.stringify({ key: 'value' }));

    (useRouter as Mock).mockReturnValue({ replace: mockReplace });
    (usePathname as Mock).mockReturnValue(
      `/client/GET/${encodedUrl}/${encodedBody}`
    );
    (useSearchParams as Mock).mockReturnValue(new URLSearchParams({ x: 'y' }));
    (variablesHook.useVariables as Mock).mockReturnValue([mockVariables]);
    mockReplace.mockClear();
  });

  it('setHeaders updates state.headers', () => {
    const { result } = renderHook(() => useRestfulUrl());
    act(() => result.current.setHeaders({ a: 'b' }));
    expect(result.current.state.headers).toEqual({ a: 'b' });
  });

  it('setMethod updates state.method', () => {
    const { result } = renderHook(() => useRestfulUrl());
    act(() => result.current.setMethod('POST'));
    expect(result.current.state.method).toBe('POST');
  });

  it('setUrl updates state.url', () => {
    const { result } = renderHook(() => useRestfulUrl());
    act(() => result.current.setUrl('new-url'));
    expect(result.current.state.url).toBe('new-url');
  });

  it('setBody updates state.body', () => {
    const { result } = renderHook(() => useRestfulUrl());
    act(() => result.current.setBody('{"test":1}'));
    expect(result.current.state.body).toBe('{"test":1}');
  });

  it('send generates the correct URL and calls router.replace', () => {
    const { result } = renderHook(() => useRestfulUrl());

    act(() => result.current.send());

    const encBody = encodeBase64(JSON.stringify({ key: 'value' }));
    const expectedUrl = `/client/GET/${encBody}?x=y`;

    expect(mockReplace).toHaveBeenCalledWith(expectedUrl);
  });
});
