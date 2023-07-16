import Link from 'next/link'
import styled from 'styled-components'
import Center from '@/components/Center'
import { useContext, useState } from 'react'
import { CartContext } from '@/components/CartContext'
import Searchbar from './SearchBar'
import { BarsIcon, CartIcon, PhoneIcon, TruckIcon } from './icons/Icon'
import MenuDropdown from './MenuDropdown'

const StyledHeader = styled.header`
  background-color: #1d273e;
  position: fixed;
  width: 100%;
  top: 0;
`
const Wrapper = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled(Link)`
  display: flex;
  color: #f28102;
  text-decoration: none;
  position: relative;
  z-index: 3;
`
const StyledNav = styled.nav`
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #1d273e;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`
const NavLink = styled(Link)`
  svg {
    height: 34px;
  }
  gap: 5px;
  display: flex;
  align-items: center;
  color: #f28102;
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`

export default function Header() {
  const { cartProducts } = useContext(CartContext)
  const [mobileNavActive, setMobileNavActive] = useState(false)
  const menuItems = [
    {
      label: 'Home',
      url: '/#',
      child: [
        { title: '1', content: ['Home1', 'About3', 'Contact3'] },
        { title: '2', content: ['Home2', 'About3', 'Contact3'] },
      ],
    },
    {
      label: 'About',
      url: '/#',
      child: [
        { title: '3', content: ['Home3', 'About3', 'Contact3'] },
        { title: '4', content: ['Home4', 'About3', 'Contact3'] },
      ],
    },
    {
      label: 'Services',
      url: '/#',
      child: [
        { title: '5', content: ['Home5', 'About3', 'Contact3'] },
        { title: '6', content: ['Home6', 'About3', 'Contact3'] },
      ],
    },
    {
      label: 'Contact',
      url: '/#',
      child: [
        { title: '7', content: ['Home7', 'About3', 'Contact3'] },
        { title: '8', content: ['Home8', 'About3', 'Contact3'] },
        { title: '8', content: ['Home8', 'About3', 'Contact3'] },
        { title: '8', content: ['Home8', 'About3', 'Contact3'] },
        { title: '8', content: ['Home8', 'About3', 'Contact3'] },
        { title: '8', content: ['Home8', 'About3', 'Contact3'] },
      ],
    },
  ]
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'}>E-Tapo</Logo>
          <MenuDropdown items={menuItems} />
          <Searchbar />
          {!mobileNavActive && (
            <StyledNav>
              {/* <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/products'}>All products</NavLink>
            <NavLink href={'/categories'}>Categories</NavLink>
            <NavLink href={'/account'}>Account</NavLink> */}
              <NavLink href={'/#'}>
                <PhoneIcon />
                Gọi mua hàng
              </NavLink>
              <NavLink target="_blank" href={'/#'}>
                <TruckIcon />
                Tra cứu đơn hàng
              </NavLink>
              <NavLink href={'/cart'}>
                <CartIcon />
                Giỏ hàng ({cartProducts.length})
              </NavLink>
            </StyledNav>
          )}
          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  )
}
