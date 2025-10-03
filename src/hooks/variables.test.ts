import { renderHook, act } from '@testing-library/react';
import { useVariables } from './variables';
import { getAuth } from 'firebase/auth';
import { UNIQ_KEY } from '../shared/constants/variables';
import { Mock, vi } from 'vitest';

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
}));

describe('useVariables', () => {
  const mockUserId = 'test-user-id';
  const storageKey = `${UNIQ_KEY}_${mockUserId}_vars`;

  beforeEach(() => {
    (getAuth as Mock).mockReturnValue({
      currentUser: { uid: mockUserId },
    });
    localStorage.clear();
    vi.spyOn(Storage.prototype, 'setItem');
  });

  it('updates the state when setVariables is called', () => {
    const { result } = renderHook(() => useVariables());
    const [, setVariables] = result.current;

    act(() => {
      setVariables([['foo', 'bar']]);
    });

    expect(result.current[0]).toEqual([['foo', 'bar']]);
  });

  it('saves data to localStorage', () => {
    const { result } = renderHook(() => useVariables());
    const [, setVariables] = result.current;

    act(() => {
      setVariables([['foo', 'bar']]);
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      storageKey,
      JSON.stringify({ foo: 'bar' })
    );
  });

  it('overwrites existing data in localStorage', () => {
    localStorage.setItem(storageKey, JSON.stringify({ old: 'value' }));
    const { result } = renderHook(() => useVariables());
    const [, setVariables] = result.current;

    act(() => {
      setVariables([['new', 'val']]);
    });

    expect(localStorage.getItem(storageKey)).toBe(
      JSON.stringify({ new: 'val' })
    );
  });
});
