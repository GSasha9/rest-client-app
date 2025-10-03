import { render, screen, fireEvent } from '@testing-library/react';
import ComponentSlider from './ComponentSlider';

describe('ComponentSlider', () => {
  const slides = [
    <div key="1">Slide 1</div>,
    <div key="2">Slide 2</div>,
    <div key="3">Slide 3</div>,
  ];

  it('renders the first slide initially', () => {
    render(<ComponentSlider slides={slides} />);
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
  });

  it('navigates to next slide when ▶ button is clicked', () => {
    render(<ComponentSlider slides={slides} />);
    fireEvent.click(screen.getByText('▶'));
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
  });

  it('navigates to previous slide when ◀ button is clicked', () => {
    render(<ComponentSlider slides={slides} />);
    fireEvent.click(screen.getByText('◀'));
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
  });

  it('wraps around to first slide after last slide', () => {
    render(<ComponentSlider slides={slides} />);
    fireEvent.click(screen.getByText('▶'));
    fireEvent.click(screen.getByText('▶'));
    fireEvent.click(screen.getByText('▶'));
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
  });

  it('wraps around to last slide from first slide using ◀', () => {
    render(<ComponentSlider slides={slides} />);
    fireEvent.click(screen.getByText('◀'));
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
  });
});
