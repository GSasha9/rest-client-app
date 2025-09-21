import { renderHook, waitFor } from '@testing-library/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import useUserName from './use-user-name';
import { vi, Mock } from 'vitest';

vi.mock('@/lib/firebase', () => ({
  auth: {},
  db: {},
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: vi.fn(),
}));

describe('useUserName', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns undefined if user = null', () => {
    (useAuthState as Mock).mockReturnValue([null]);

    const { result } = renderHook(() => useUserName());

    expect(result.current).toBeUndefined();
    expect(getDoc).not.toHaveBeenCalled();
  });

  it('returns the name if the document exists', async () => {
    (useAuthState as Mock).mockReturnValue([{ uid: '123' }]);
    (doc as Mock).mockReturnValue('docRef');
    (getDoc as Mock).mockResolvedValue({
      exists: () => true,
      data: () => ({ name: 'Alice' }),
    });

    const { result } = renderHook(() => useUserName());

    await waitFor(() => {
      expect(result.current).toBe('Alice');
    });
  });

  it('leaves undefined if the document does not exist', async () => {
    (useAuthState as Mock).mockReturnValue([{ uid: '123' }]);
    (doc as Mock).mockReturnValue('docRef');
    (getDoc as Mock).mockResolvedValue({
      exists: () => false,
    });

    const { result } = renderHook(() => useUserName());

    await waitFor(() => {
      expect(result.current).toBeUndefined();
    });
  });
});
