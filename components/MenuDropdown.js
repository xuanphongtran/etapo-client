import { useState } from 'react'
import styled from 'styled-components'
import { BarsIcon } from './icons/Icon'
import MenuTree from './MenuWrapper'

const MenuButton = styled.button`
  padding: 2px 6px;
  gap: 6px;
  display: flex;
  border: none;
  align-items: center;
  border-radius: 10px;
  background-color: hsla(0, 0%, 100%, 0.2);
  color: #f28102;
  svg {
    height: 34px;
  }
`

const MenuDropdown = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <MenuButton onClick={handleToggle}>
      <BarsIcon />
      Danh mục
      {isOpen && <MenuTree items={items} />}
    </MenuButton>
  )
}

export default MenuDropdown
