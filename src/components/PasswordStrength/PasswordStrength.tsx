import { FC, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { genStyles } from '@/styles/genStyles';
import { ADDITION_COLOR } from '@/theme/theme';

interface IPasswordStrengthProps {
  password: string;
}

const STYLES = genStyles({
  powerMeter: {
    width: '100%',
    height: '0.25rem',
    borderRadius: '0.2rem',
    backgroundColor: ADDITION_COLOR.translucent,
  },
  powerScale: {
    width: '1%',
    height: '100%',
    borderRadius: '0.2rem',
    transition: '0.3s',
    backgroundColor: ADDITION_COLOR.light,
  },
});

const PasswordStrength: FC<IPasswordStrengthProps> = ({ password }) => {
  const passStrengthMeterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const passStrengthMeter = passStrengthMeterRef.current as HTMLElement;
    const getPassStrengthValue = (pass: string): number => {
      let passStrength: number = 0;

      if (pass?.length > 0 && /(?=.*\p{L})/u.test(pass)) {
        passStrength += 1;
      }

      if (/(?=.*\d)/u.test(pass)) {
        passStrength += 1;
      }

      if (/(?=.*[@$#№:;^!%*?&*()_+,."'~/|])/.test(pass)) {
        passStrength += 1;
      }

      if (pass?.length >= 8) {
        passStrength += 1;
      }

      return passStrength;
    };

    const selectStrengthMeterColor = (passStrength: number): string => {
      switch (passStrength) {
        case 1:
          return '#ff0000';
        case 2:
          return '#ff9060';
        case 3:
          return '#fff200';
        case 4:
          return '#00ff03';
        default:
          return '#909090';
      }
    };

    const passStrength = getPassStrengthValue(password);
    const color = selectStrengthMeterColor(passStrength);

    passStrengthMeter.style.width = `${(passStrength / 4) * 100}%`;
    passStrengthMeter.style.backgroundColor = color;
  }, [password]);

  return (
    <Box sx={STYLES.powerMeter}>
      <Box
        sx={STYLES.powerScale}
        ref={passStrengthMeterRef}
        data-testid="meter"
      ></Box>
    </Box>
  );
};

export default PasswordStrength;
