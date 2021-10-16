import {ComponentPropsWithoutRef} from 'react'
import styled, {css} from 'styled-components'
import {darken, mix} from 'polished'

export type ButtonColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'light' | 'dark'

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  active?: boolean,
  block?: boolean,
  color?: ButtonColor,
  small?: boolean,
}

export const ButtonContent = styled.div`
  width: 100%;
  height: 100%;
  padding: .75rem 1.25rem;
  box-sizing: border-box;
  
  ${({ theme }) => css`
    border-radius: ${theme.borderRadius};
    transition: ${theme.baseTransition};
  `}
`
ButtonContent.displayName = 'ButtonContent'

export const ButtonWrapper = styled.button<ButtonProps>`
  padding: .1rem;
  font-weight: 500;
  font-size: .875rem;
  font-family: Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  cursor: pointer;
  border: none;
  line-height: 1.125;
  -webkit-tap-highlight-color: transparent;
  outline: none;
  user-select: none;
  letter-spacing: .05rem;
  
  ${({theme}) => css`
    border-radius: ${theme.borderRadius};
    color: ${theme.text};
    background-color: ${theme.background};
    transition: ${theme.baseTransition};
    ${theme.neumorphism(theme.background)}
  `}
  
  ${({small}) => small && css`
    ${ButtonContent} {
      padding: .25rem .5rem;
    }
  `}
  
  ${({block}) => block && css`
    width: 100%;
    display: block;
  `}
  
  ${({active, theme}) => active && css`
    ${ButtonContent} {
      ${theme.neumorphism(theme.background, false, 'topleft', true)}
    }
  `}

  &:disabled {
    cursor: default;
    box-shadow: none;
    opacity: .65;
    background-color: ${({theme}) => darken(0.04, theme.background)};
  }

  &:active:not(:disabled) {
    //font-size: .87rem;

    ${ButtonContent} {
      ${({theme}) => theme.neumorphism(theme.background, false, 'topleft', true)};
    }
  }
  
  ${({color, theme}) => color && css`
    color: ${theme.background};
    // TODO fix type for color picker
    background: linear-gradient(145deg, ${mix(0.7, theme[color as 'success'], theme.background)} 20%, ${theme[color as 'success']});
    ${theme.neumorphism(theme[color as 'success'])};

    &:active:not(:disabled) {
      ${ButtonContent} {
        ${theme.neumorphism(theme[color as 'success'], false, 'topleft', true)};
      }
    }
  `}
`
ButtonWrapper.displayName = 'ButtonWrapper'