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
const HeaderOvelay = styled.div`
  background: rgba(0, 0, 0, 0.53);
  height: 100vh;
  left: 0;
  position: fixed;
  top: 64px;
  transition: 0.3s;
  width: 100%;
  z-index: 30;
`
const MenuDropdown = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <MenuButton onClick={handleToggle}>
      <BarsIcon />
      Thương Hiệu
      {isOpen && <MenuTree items={items} />}
      {isOpen && <HeaderOvelay />}
    </MenuButton>
  )
}

export default MenuDropdown
