// components/Dropdown.js

import React, { useState } from 'react'
import styled from 'styled-components'
import { ArrowUpIcon } from '../icons/Icon'

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`

const DropdownButton = styled.button`
  display: flex;
  background-color: transparent;
  color: #666666;
  border: none;
  cursor: pointer;
  align-items: center;
  font-size: 14px;
  svg {
    transform: rotate(180deg);
    margin-left: 5px;
  }
`

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  list-style: none;
  padding: 0;
  z-index: 10;
  min-width: 180px;
  margin: 5px 0 0;
  border-radius: 0 0 5px 5px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
`

const DropdownItem = styled.li`
  padding: 10px;
  color: #666666;
  cursor: pointer;

  &:hover {
    color: #ff782c;
  }
`

const Dropdown = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (option) => {
    setSelectedOption(option)
    setIsOpen(false)
  }

  return (
    <DropdownContainer>
      <DropdownButton onClick={handleToggle}>
        {selectedOption || 'Defaul sorting'} <ArrowUpIcon />
      </DropdownButton>

      <DropdownList $isOpen={isOpen}>
        {options.map((option) => (
          <DropdownItem key={option} onClick={() => handleSelect(option)}>
            {option}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  )
}

export default Dropdown
