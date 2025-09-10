import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import BodyEditor from './BodyEditor';
import userEvent from '@testing-library/user-event';

describe('BodyEditor', () => {
  const mockHandleBody = vi.fn();

  it('renders textfield and button', () => {
    render(<BodyEditor body="Test body" handleBody={mockHandleBody} />);

    expect(screen.getByRole('button', { name: /prettify/i })).toBeInTheDocument;
    expect(screen.getByText('Test body')).toBeInTheDocument;
  });

  (it('button prettifies valid JSON'),
    async () => {
      const validJson = '"key":"value"';

      render(<BodyEditor body={validJson} handleBody={mockHandleBody} />);

      const prettifyButton = screen.getByRole('button', { name: /prettify/i });

      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;

      await userEvent.click(prettifyButton);

      expect(mockHandleBody).toHaveBeenCalledWith(
        JSON.stringify(JSON.parse(validJson), null, 4)
      );

      expect(textarea.value).toBe(
        JSON.stringify(JSON.parse(validJson), null, 4)
      );

      expect(screen.getByText(/Prettifying only for JSON/i)).not
        .toBeInTheDocument;
    });

  it('sets error state on invalid JSON', async () => {
    const mockHandleBody = vi.fn();
    const invalidJson = '{"key":}';

    render(<BodyEditor body={invalidJson} handleBody={mockHandleBody} />);

    const button = screen.getByRole('button', { name: /prettify/i });
    await userEvent.click(button);

    expect(mockHandleBody).not.toHaveBeenCalled();
    expect(screen.getByText(/Prettifying only for JSON/i)).toBeInTheDocument();
  });
});
