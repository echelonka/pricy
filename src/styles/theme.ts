import {DefaultTheme, createGlobalStyle} from 'styled-components'
import {media, neumorphism, Breakpoints} from './mixins'

interface CommonTheme {
  font: string,
  baseTransition: string,
  white: string,
  black: string,
  breakpoints: Breakpoints,
  borderRadius: string,
  neumorphism: typeof neumorphism,
}

declare module 'styled-components' {
  export interface DefaultTheme extends CommonTheme {
    background: string;
    text: string;
    success: string;
  }
}

const commonTheme: CommonTheme = {
  font: `'Ubuntu', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif`,
  baseTransition: 'all 250ms cubic-bezier(.27, .01, .38, 1.06)',
  white: '#fff',
  black: '#000',
  breakpoints: media,
  borderRadius: '.625rem',
  neumorphism,
}

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    background-color: ${({theme}) => theme.background};
    color: ${({theme}) => theme.text};
    font-family: ${({theme}) => theme.font};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  input {
    -webkit-appearance: none;
  }

  ul {
    margin: 0;
  }
`

export const lightTheme: DefaultTheme = {
  ...commonTheme,
  background: '#ebf3fa',
  text: '#324c5b',
  success: '#17c671',
}

export const darkTheme: DefaultTheme = {
  ...commonTheme,
  background: '#1d1f23',
  text: '#324c5b',
  success: '#17c671',
}
