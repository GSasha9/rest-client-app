import React from 'react';
import { useState } from 'react';
import s from './ComponentSlider.module.scss';

export interface ComponentSliderProps {
  slides: React.ReactElement[];
}

const ComponentSlider = ({ slides }: ComponentSliderProps) => {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const prevSlide = () => {
    setCurrent((current - 1 + total) % total);
  };

  const nextSlide = () => {
    setCurrent((current + 1) % total);
  };

  return (
    <div className={s.sliderContainer}>
      <button onClick={prevSlide} className={s.navButton}>
        ◀
      </button>

      <div className={s.slide}>{slides[current]}</div>

      <button onClick={nextSlide} className={s.navButton}>
        ▶
      </button>
    </div>
  );
};

export default ComponentSlider;
