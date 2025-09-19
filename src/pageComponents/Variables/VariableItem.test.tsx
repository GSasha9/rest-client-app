import { screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import {
  mockSetVariables,
  renderVariableItem,
} from '../../test-utils/mocks/variables-item.mock';

describe('VariableItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders inputs with correct initial values', () => {
    renderVariableItem();

    expect(screen.getByDisplayValue('bb')).toBeInTheDocument();
    expect(screen.getByDisplayValue('bbbb')).toBeInTheDocument();
  });

  it('changes the local state when typing', () => {
    renderVariableItem();

    const keyInput = screen.getByDisplayValue('bb');
    const valueInput = screen.getByDisplayValue('bbbb');

    fireEvent.change(keyInput, { target: { value: 'newKey' } });
    fireEvent.change(valueInput, { target: { value: 'newValue' } });

    expect(keyInput).toHaveValue('newKey');
    expect(valueInput).toHaveValue('newValue');
  });

  it('will call setVariables with the updated values ​​on blur', () => {
    renderVariableItem();

    const keyInput = screen.getByDisplayValue('bb');
    fireEvent.change(keyInput, { target: { value: 'changedKey' } });
    fireEvent.blur(keyInput);

    expect(mockSetVariables).toHaveBeenCalledWith([
      ['aa', 'aaaa'],
      ['changedKey', 'bbbb'],
    ]);
  });

  it('the delete button calls setVariables without a current element.', () => {
    renderVariableItem();

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockSetVariables).toHaveBeenCalledWith([['aa', 'aaaa']]);
  });
});
