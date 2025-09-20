import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/components/ComponentSlider/ComponentSlider', () => ({
  __esModule: true,
  default: ({ slides }: any) => (
    <div data-testid="component-slider">{slides}</div>
  ),
}));

vi.mock('@/components/Developers/Developers', () => ({
  __esModule: true,
  default: () => <div>Developers Component</div>,
}));

vi.mock('@/components/ProjectAndCourse/ProjectAndCourse', () => ({
  __esModule: true,
  default: () => <div>ProjectAndCourse Component</div>,
}));

import MainContent from './MainContent';

describe('MainContent', () => {
  it('renders ComponentSlider with two slides', () => {
    render(<MainContent />);

    const slider = screen.getByTestId('component-slider');
    expect(slider).toBeInTheDocument();

    expect(screen.getByText('Developers Component')).toBeInTheDocument();
    expect(screen.getByText('ProjectAndCourse Component')).toBeInTheDocument();
  });
});
