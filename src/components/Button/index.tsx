import React from 'react'
import styled, {css} from 'styled-components'
import {darken, mix} from 'polished'
import { ButtonContent } from './styled'

type ButtonColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'light' | 'dark'

interface NewProps extends React.ComponentPropsWithoutRef<'button'> {
  active?: boolean,
  block?: boolean,
  color?: ButtonColor,
  small?: boolean,
}

const Button: React.FC<NewProps> = (props: NewProps) => {
  const {active, className, children, ...attrs} = props

  return (
    <StyledButton {...attrs} active={active} className={className}>
      <ButtonContent>
        {children}
      </ButtonContent>
    </StyledButton>
  )
}

const StyledButton = styled.button<NewProps>`
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

export default React.memo(Button)
