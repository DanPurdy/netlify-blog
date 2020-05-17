import { createGlobalStyle } from 'styled-components';

export const colors = {
  portfolioBackground: '#23a2fd',
  primaryFontColor: '#FFFFFF',
};

export const fonts = {
  // heading: 'Berlingske Serif',
  // default: 'Campton-Book',
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

  html {
    font-size: 62.5%;
    -webkit-font-smoothin: anti-aliased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    /* font-family: "${fonts.default}"; */
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
    /* font-family: "${fonts.heading}"; */
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
