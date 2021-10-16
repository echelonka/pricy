import {ComponentPropsWithoutRef} from 'react'
import styled, {css, keyframes, FlattenSimpleInterpolation} from 'styled-components'

export type LoaderProps = { fullPage?: boolean } & ComponentPropsWithoutRef<'div'>

const circleAnimation = (scale: number) => keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(${scale});
    opacity: 0;
  }
`

const circleStyles = (scale: number, delay: string) => css`
  transform: scale(0);
  animation-name: ${circleAnimation(scale)};
  animation-duration: 4s;
  animation-timing-function: cubic-bezier(.27, .01, .38, 1.06);
  animation-iteration-count: infinite;
  animation-delay: ${delay};
`

export const LoaderCircle = styled.div`
  position: absolute;
  width: 20vw;
  height: 20vw;
  border-radius: 50%;
  ${({theme}) => theme.neumorphism(theme.background, false, 'topleft', true, '0.2rem')}
`
LoaderCircle.displayName = 'LoaderCircle'

export const LoaderWrapper = styled.div<LoaderProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({fullPage, theme}) => fullPage && css`
    height: 100vh;
    left: 0;
    top: 0;
    position: fixed;
    background-color: ${theme.background};
  `}
  
  ${() => {
    const animationStyles: FlattenSimpleInterpolation[] = [];

    [1, 2, 3, 4, 5].forEach((i: number) => {
      const scale = 3 - i * 0.4
      const delay = `${((i - 1) * 0.4)}s`
      animationStyles.push(css`
        ${LoaderCircle}:nth-child(${i}) {
          ${circleStyles(scale, delay)}
        }
      `);
    })

    return animationStyles
  }}
}
`
LoaderWrapper.displayName = 'Loader'
