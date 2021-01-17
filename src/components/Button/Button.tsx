import React from 'react'
import classnames from 'classnames'
import styled, {css} from 'styled-components'
import {darken, mix} from 'polished'

interface NewProps extends React.ComponentPropsWithoutRef<'button'> {
  active?: boolean,
  block?: boolean,
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'light' | 'dark',
  small?: boolean,
}

const Button = (props: NewProps) => {
  const {active, className, children, ...attrs} = props
  const classNames = classnames(className, active && 'active')

  return (
    <StyledButton {...attrs} className={classNames}>
      <ButtonContent>
        {children}
      </ButtonContent>
    </StyledButton>
  )
}

const ButtonContent = styled.div`
  width: 100%;
  height: 100%;
  padding: .75rem 1.25rem;
  box-sizing: border-box;
  border-radius: ${({theme}) => theme.borderRadius};
  transition: ${({theme}) => theme.baseTransition};
`

const StyledButton = styled.button<NewProps>`
  padding: .1rem;
  font-weight: 500;
  font-size: .875rem;
  font-family: Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  cursor: pointer;
  border-radius: ${({theme}) => theme.borderRadius};
  border: none;
  line-height: 1.125;
  -webkit-tap-highlight-color: transparent;
  outline: none;
  user-select: none;
  color: ${({theme}) => theme.text};
  letter-spacing: .05rem;
  background-color: ${({theme}) => theme.background};
  transition: ${({theme}) => theme.baseTransition};
  ${({theme}) => theme.neumorphism(theme.background)};
  
  ${({small}) => small && css`
    ${ButtonContent} {
      padding: .25rem .5rem;
    }
  `}
  
  ${({block}) => block && css`
    width: 100%;
    display: block;
  `}

  &:disabled {
    cursor: default;
    box-shadow: none;
    opacity: .65;
    background-color: ${({theme}) => darken(0.04, theme.background)};
  }

  &:active:not(:disabled), &.active {
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
