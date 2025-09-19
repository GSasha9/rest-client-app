import { screen, fireEvent, getByText, render } from '@testing-library/react';
import { vi } from 'vitest';
import {
  mockSetVariables,
  mockVariables,
  renderVariablesPage,
} from '../../test-utils/mocks/variables-page.mock';

describe('VariablesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the title and button', () => {
    renderVariablesPage();

    expect(screen.getByText('Variables:')).toBeInTheDocument();
    expect(screen.getByText('add')).toBeInTheDocument();
  });

  it('renders a VariableItem for each variable', () => {
    renderVariablesPage();

    const items = screen.getAllByTestId('variable-item');
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent('aa:abc');
  });

  it('clicking on Add calls setVariables with a new empty pair', () => {
    renderVariablesPage();

    fireEvent.click(screen.getByText('add'));
    expect(mockSetVariables).toHaveBeenCalledWith([...mockVariables, ['', '']]);
  });

  it('clicking the add button calls setVariables', () => {
    renderVariablesPage();

    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    expect(mockSetVariables).toHaveBeenCalledWith([
      ['aa', 'abc'],
      ['', ''],
    ]);
  });
});
