import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ToastifyNotification from './ToastifyNotification';

describe('ToastifyNotification', () => {
  it('renders without crashing', () => {
    const { container } = render(<ToastifyNotification />);
    expect(container).toBeInTheDocument();
  });
});
