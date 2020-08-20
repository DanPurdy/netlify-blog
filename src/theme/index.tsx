import { createGlobalStyle } from 'styled-components';

export const colors = {
  portfolioBackground: '#081635',
  primaryFontColor: '#FFFFFF',
  underlineColor: 'rgb(239, 82, 138)',
  white: '#ffffff',
};

export const breakpoints = {
  /** 1080px */
  wide: '1080px',
  /** 768px */
  palm: '768px',
  /** 650px */
  smallPalm: '650px',
  /** 500px */
  largeHand: '500px',
  /** 400px */
  mediumHand: '400px',
  /** 350px */
  smallHand: '350px',
  /** 320px */
  minScreenSize: '320px',
};

export const fonts = {
  heading: 'Lato',
  default: 'Noto Sans JP',
  // defaultMedium: 'Campton-Medium',
  // defaultBold: 'Campton-Bold',
  // defaultSemibold: 'Campton-SemiBold',
};

export const main = {
  sidebarWith: '64px',
};

export const GlobalStyle = createGlobalStyle`
  *, :after, :before {
    box-sizing: border-box;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: ${colors.portfolioBackground} ${colors.underlineColor};
  }

  /* Works on Chrome/Edge/Safari */
  *::-webkit-scrollbar {
    width: 1rem;
  }
  *::-webkit-scrollbar-track {
    background: ${colors.portfolioBackground};
  }
  *::-webkit-scrollbar-thumb {
    background-color: ${colors.underlineColor};
  }

  html {
    font-size: 62.5%;
    -webkit-font-smoothin: anti-aliased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${fonts.default}, sans-serif;
    font-size: 1.4rem;
    font-weight: 300;
    padding: 0;
    margin: 0;
    color: ${colors.primaryFontColor};
    background-color: ${colors.portfolioBackground};
  }

  html, body {
    min-height: 100vh;
    min-width: 320px
  }

  img {
    max-width: 100%;
    vertical-align: middle;
  }

  h1, h2, h3 {
    font-family: ${fonts.heading}, sans-serif;
    font-weight: 700;
  }

  h1 {
    display: inline-block;
    font-size: 6.6rem;

    @media(max-width: 400px) {
      font-size: 3.0rem;
    }
  }

  h2 {
    font-size: 3.8rem;
  }

  h3 {
    font-size: 3rem;
    line-height: 4.1rem;

    @media (max-width: 768px) {
      font-size: 1.8rem;
      line-height: 2.5rem;
    }
  }

  h4 {
    margin: 2rem 0 1rem;
    font-size: 1.8rem;
    line-height: 2.1rem;

    @media (max-width: 768px) {
      font-size: 1.6rem;
    }
  }

  b, strong {
    font-weight: 500;
  }

  a {
    color: ${colors.primaryFontColor};
    cursor: pointer;
    text-decoration: underline;
  }
`;
