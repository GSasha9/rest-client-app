import { toast } from 'react-toastify';
import { describe, expect, it, vi } from 'vitest';
import {
  errorNotifyMessage,
  successNotifyMessage,
  warningNotifyMessage,
} from './notifyMessage';

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe('notifyMessage functions', () => {
  it('should call toast.success with the correct message and options', () => {
    const message = 'Success message';

    successNotifyMessage(message);

    expect(toast.success).toHaveBeenCalledWith(message, {
      position: 'bottom-center',
    });
  });

  it('should call toast.warn with the correct message and options', () => {
    const message = 'Warning message';

    warningNotifyMessage(message);

    expect(toast.warn).toHaveBeenCalledWith(message, {
      position: 'bottom-center',
    });
  });

  it('should call toast.error with the correct message and options', () => {
    const message = 'Error message';

    errorNotifyMessage(message);

    expect(toast.error).toHaveBeenCalledWith(message, {
      position: 'bottom-left',
    });
  });
});
