import { DefaultTheme } from 'styled-components';

const space = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '2rem',
  xl: '4rem',
  xxl: '5rem',
};

const sizes = {
  xxs: '1rem',
  xs: '2rem',
  sm: '4rem',
  xl: '6.25rem',
  xxl: '10rem',
  '3xl': '15rem',
  // '3xs': '14rem',
  // '2xs': '16rem',
  // xs: '20rem',
  // sm: '24rem',
  // md: '28rem',
  // lg: '32rem',
  // xl: '36rem',
};

const theme: DefaultTheme = {
  color: {
    darkShades: '#32384C',
    darkAccent: '#798394',
    main: '#8BBB60',
    lightAccent: '#4AABC0',
    lightShades: '#F8F6F8',
  },
  breakpoints: { sm: '30em', md: '48em', lg: '62em', xl: '80em' },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
  fontSizes: {
    xxs: '10px',
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '64px',
  },
  space,
  sizes,
};

export default theme;
