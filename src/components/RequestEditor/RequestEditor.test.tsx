import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RequestEditor from './RequestEditor';

describe('RequestEditor', () => {
  it('renders select input and text input', () => {
    render(
      <RequestEditor method="POST" handleSelect={vi.fn()} handleUrl={vi.fn()} />
    );

    expect(screen.getByRole('combobox'));
    expect(screen.getByRole('textbox'));
  });
});
