import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { vi } from 'vitest';
import enMessages from '../../../messages/en.json';
import VariableItem from '../../pageComponents/Variables/VariableItem';

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

export const renderVariableItem = () => {
  return render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <VariableItem
        variables={mockVariables}
        variable={'bb'}
        value={'bbbb'}
        setVariables={mockSetVariables}
      />
    </NextIntlClientProvider>
  );
};
