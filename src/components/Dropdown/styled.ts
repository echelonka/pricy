import styled, { css } from 'styled-components'
import Button from '../Button'
import {ButtonContent} from '../Button/styled'

export interface DropdownItemProps {
  selected?: boolean;
}

export interface DropdownHandleProps {
  opened?: boolean;
}

export const DropdownContainer = styled.div`
  width: 100%;
  position: relative;
`
DropdownContainer.displayName = 'DropdownContainer'

export const DropdownHandle = styled.span<DropdownHandleProps>`
  svg {
    width: 16px;
    height: 16px;
    margin: 0 0 -3px 5px;
    ${({ theme, opened }) => css`
      transition: ${theme.baseTransition};
      transform: rotate(${opened ? 0 : -180}deg);
    `}
  }
`
DropdownHandle.displayName = 'DropdownHandle'

export const DropdownItem = styled.span<DropdownItemProps>`
  padding: .75rem 1.25rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.baseTransition};
  
  ${({ selected, theme }) =>
    selected
      ? theme.neumorphism(theme.background, false, 'topleft', true)
      : theme.neumorphism(theme.background, true, 'topleft', true, '0.05rem')
}
`
DropdownItem.displayName = 'DropdownItem'

export const DropdownButton = styled(Button)`
  width: 100%;
  text-align: left;
  
  ${ButtonContent} {
    display: flex;
    justify-content: space-between;
  }
`
DropdownButton.displayName = 'DropdownButton'

export const DropdownContent = styled.div`
  width: 100%;
  position: absolute;
  display: grid;
  row-gap: 0.1rem;
  z-index: 9;
  top: 55px;
  max-height: 300px;
  overflow-y: auto;
  ${({ theme }) => css`
    background-color: ${theme.background};
    border-radius: ${theme.borderRadius};
    ${theme.neumorphism(theme.background, false, 'topleft', false, '0.25rem')};
  `}
`
DropdownContent.displayName = 'DropdownContent'
