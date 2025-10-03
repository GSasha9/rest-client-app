import { vi } from 'vitest';
import {
  mockVariables,
  renderVariablesPage,
} from '../../test-utils/mocks/variables-page.mock';
import { fireEvent, screen } from '@testing-library/dom';
import { mockSetVariables } from '../../test-utils/mocks/variables-page.mock';

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
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('aa:aaaa');
    expect(items[1]).toHaveTextContent('bb:bbbb');
  });

  it('clicking on Add calls setVariables with a new empty pair', () => {
    renderVariablesPage();
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    expect(mockSetVariables).toHaveBeenCalledWith([...mockVariables, ['', '']]);
  });

  it('clicking the add button calls setVariables', () => {
    renderVariablesPage();

    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    expect(mockSetVariables).toHaveBeenCalledWith([
      ['aa', 'aaaa'],
      ['bb', 'bbbb'],
      ['', ''],
    ]);
  });
});
