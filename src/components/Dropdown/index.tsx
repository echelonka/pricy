import React, { PropsWithoutRef, useState, useRef } from 'react'
import useClickOutside from '../../hooks/useClickOutside'
// Components
import { DropdownButton, DropdownContainer, DropdownContent, DropdownHandle, DropdownItem } from './styled'

export interface DropdownOption {
  id: number | string;
  name: string;
}

interface Props {
  onChange: (option: any) => void;
  options: DropdownOption[];
  placeholder?: string;
  value: any;
}

const Dropdown: React.FC<Props> = (props: PropsWithoutRef<Props>) => {
  const [contentShown, setContentShown] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const closeDropdown = () => setContentShown(false)

  const toggleDropdown = () => setContentShown(prevState => !prevState)

  const selectItem = (option: DropdownOption) => {
    props.onChange(option)
    closeDropdown()
  }

  useClickOutside(containerRef, closeDropdown)

  return (
    <DropdownContainer ref={containerRef}>
      <DropdownButton active={contentShown} onClick={toggleDropdown}>
        <span>{props.value?.name || props.placeholder || 'Select'}</span>
        <DropdownHandle opened={contentShown}>
          <svg fill="currentColor" viewBox="0 0 40 40">
            <path d="M31 26.4q0 .3-.2.5l-1.1 1.2q-.3.2-.6.2t-.5-.2l-8.7-8.8-8.8 8.8q-.2.2-.5.2t-.5-.2l-1.2-1.2q-.2-.2-.2-.5t.2-.5l10.4-10.4q.3-.2.6-.2t.5.2l10.4 10.4q.2.2.2.5z" />
          </svg>
        </DropdownHandle>
      </DropdownButton>
      {contentShown && <DropdownContent>
        {props.options.map(option => (
          <DropdownItem
            key={option.id}
            selected={props.value?.id === option.id}
            onClick={() => selectItem(option)}
          >
            {option.name}
          </DropdownItem>
        ))}
      </DropdownContent>}
    </DropdownContainer>
  )
}

export default Dropdown
