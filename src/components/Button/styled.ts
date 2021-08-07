import styled, { css } from 'styled-components'

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
