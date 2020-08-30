// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      darkShades: string;
      darkAccent: string;
      main: string;
      lightAccent: string;
      lightShades: string;
    };
    breakpoints: { sm: string; md: string; lg: string; xl: string };
    fontWeights: {
      normal: number;
      medium: number;
      bold: number;
    };
    fontSizes: {
      xxs: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
      '6xl': string;
    };
    space: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    sizes: {
      xs: string;
      sm: string;
      xl: string;
      xxl: string;
      '3xl': string;
    };
  }
}
