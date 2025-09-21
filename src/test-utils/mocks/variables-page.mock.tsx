import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { vi } from 'vitest';
import VariablesPage from '../../pageComponents/Variables';
import enMessages from '../../../messages/en.json';

interface VariableItemProps {
  variables: [string, string][];
  variable: string;
  value: string;
  mockSetVariables: (newVars: [string, string][]) => void;
}

export const mockSetVariables = vi.fn();
export const mockVariables: [string, string][] = [
  ['aa', 'aaaa'],
  ['bb', 'bbbb'],
];

vi.mock('../../hooks/variables', () => ({
  useVariables: () => {
    return [mockVariables, mockSetVariables];
  },
}));

vi.mock('../../pageComponents/Variables/VariableItem.tsx', () => ({
  default: ({ variable, value, mockSetVariables }: VariableItemProps) => (
    <div data-testid="variable-item">
      <span>{variable}</span>:<span>{value}</span>
      <button onClick={() => mockSetVariables([['bb', 'bbbb']])}>delete</button>
    </div>
  ),
}));

export const renderVariablesPage = () =>
  render(
    <NextIntlClientProvider locale={'en'} messages={enMessages}>
      <VariablesPage />
    </NextIntlClientProvider>
  );
