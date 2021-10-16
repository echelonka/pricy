import styled, {css} from 'styled-components'

export const StyledContainer = styled.div`
  width: calc(100vw - 60px);
  margin: 0 auto;
  
  ${({theme}) => css`
    ${theme.breakpoints.phones`
      width: 33.75rem;
    `}
    
    ${theme.breakpoints.laptop`
      width: 60rem;
    `}
    
    ${theme.breakpoints.desktop`
      width: 71.25rem;
    `}
  `}
`
StyledContainer.displayName = 'Container'
