import {css, FlattenInterpolation, ThemedCssFunction, DefaultTheme, ThemeProps} from 'styled-components'
import {darken, lighten, math, rgba} from 'polished'

// Breakpoints
const breakpoints = {
  phones: 544,
  tablets: 768,
  laptop: 1024,
  desktop: 1200,
}

type Breakpoint = keyof typeof breakpoints

export type Breakpoints = {
  [key in keyof typeof breakpoints]: ThemedCssFunction<DefaultTheme>
}

export const media: Breakpoints = (Object.keys(breakpoints) as Breakpoint[]).reduce(
  (acc: Breakpoints, label: Breakpoint) => {
    acc[label] = (first: any, ...interpolations: any[]) => css`
      @media (min-width: ${breakpoints[label]}px) {
        ${css(first, ...interpolations)}
      }
    `

    return acc
  },
  {} as Breakpoints,
)

// Neumorphism
export const neumorphism = (
  color: string,
  hover: boolean = false,
  direction: 'topleft' | 'topcenter' | 'topright' = 'topleft',
  inset: boolean = false,
  distance: string = '0.1rem',
): FlattenInterpolation<ThemeProps<DefaultTheme>> => {
  let topX: string = math(`${distance} * 2 * -1`)
  let topY: string = math(`${distance} * 2 * -1`)

  if (direction === 'topcenter') {
    topX = '0'
  } else if (direction === 'topright') {
    topX = math(`${distance} * 2`)
  }

  const outShadow = css`
    box-shadow: ${topX} ${topY} ${math(`${distance} * 3`)} ${({theme}) => rgba(theme.white, .7)},
    ${math(`${topX} * -1`)} ${math(`${topY} * -1`)} ${math(`${distance} * 3`)} ${darken(.12, color)},
    inset ${topX} ${topY} ${math(`${distance} * 6`)} ${({theme}) => rgba(theme.white, .1)},
    inset ${math(`${topX} * -1`)} ${math(`${topY} * -1`)} ${math(`${distance} * 6`)} ${color};
  `
  const inShadow = css`
    box-shadow: ${topX} ${topY} ${math(`${distance} * 5`)} ${({theme}) => rgba(theme.white, .2)},
    inset ${topX} ${topY} ${math(`${distance} * 6`)} ${lighten(0.2, color)},
    inset ${math(`${topX} / 2`)} ${math(`${topY} / 2`)} ${distance} ${lighten(0.4, color)},
    inset ${math(`${topX} * -1`)} ${math(`${topY} * -1`)} ${math(`${distance} * 3`)} ${darken(0.1, color)};
  `
  const resultingShadow = inset ? inShadow : outShadow

  return !hover ? resultingShadow : css`
    transition: box-shadow .3s ease-in-out;
    will-change: box-shadow;
    
    &:hover {
      ${resultingShadow}
    }
  `
}
