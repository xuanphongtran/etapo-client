import styled from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '@/components/CartContext'
import Image from 'next/image'
import logo from 'public/logo.svg'
import { AccountIcon, CartIcon, HeartIcon } from '../icons/Icon'
import Searchbar from '../SearchBar'
import ShoppingCart from '../ShoppingCart'
import Link from 'next/link'
import Login from '../Login'
import AccountDialog from '../AccountDialog'

const HeaderSection = styled.section`
  top: 0;
  position: ${(props) => props.$showheader || 'fixed'};
  width: 100%;
  padding: 0.75rem 0;
  background-color: #ffffff;
  z-index: 980;
  border-bottom: 1px dashed #e5e5e5;
`
const ElementRow = styled.div`
  display: flex;
  height: 60px;
  padding: 0 100px;
  align-items: center;
  justify-content: space-between;
`
const ElementColumn = styled.div`
  position: relative;
  min-height: 1px;
  display: flex;
`
const LayoutMenu = styled.nav`
  /* overflow: visible;
  visibility: inherit; */
  max-height: none;
  font-size: 14px;
  font-weight: 500px;
`
const MenuUl = styled.ul`
  margin: 0;
  color: #949494;
  display: flex;
  list-style-type: none;
`
const MenuLi = styled.li`
  padding: 10px 20px;
  display: list-item;
`
const NavLink = styled(Link)`
  text-decoration: none;
  svg {
    height: 25px;
  }
  &:hover {
    color: #ff782c !important;
  }
  &:visited {
    color: #000000;
  }
`
const HeaderButton = styled(Link)`
  background: transparent;
  border: none;
  margin: 0 1rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  svg {
    height: 25px;
  }
  &:hover {
    color: #ff782c !important;
  }
  &:visited {
    color: #000000;
  }
`
const IconSpan = styled.div`
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 4px;
  position: relative;
  top: -12px;
  right: 4px;
  color: #fff;
  background-color: #ff782c;
  border-radius: 50%;
`

export default function Header({ showHeader }) {
  const { cartProducts, wishlist } = useContext(CartContext)
  const [login, setLogin] = useState(false)
  const [cartActive, setCartActive] = useState(false)
  const [loginActive, setLoginActive] = useState(false)
  const [accountActive, setAccountActive] = useState(false)

  // const menuItems = [
  //   {
  //     label: 'Home',
  //     url: '/#',
  //     child: [
  //       { title: '1', content: ['Home1', 'About3', 'Contact3'] },
  //       { title: '2', content: ['Home2', 'About3', 'Contact3'] },
  //     ],
  //   },
  //   {
  //     label: 'About',
  //     url: '/#',
  //     child: [
  //       { title: '3', content: ['Home3', 'About3', 'Contact3'] },
  //       { title: '4', content: ['Home4', 'About3', 'Contact3'] },
  //     ],
  //   },
  //   {
  //     label: 'Services',
  //     url: '/#',
  //     child: [
  //       { title: '5', content: ['Home5', 'About3', 'Contact3'] },
  //       { title: '6', content: ['Home6', 'About3', 'Contact3'] },
  //     ],
  //   },
  //   {
  //     label: 'Contact',
  //     url: '/#',
  //     child: [
  //       { title: '7', content: ['Home7', 'About3', 'Contact3'] },
  //       { title: '8', content: ['Home8', 'About3', 'Contact3'] },
  //       { title: '8', content: ['Home8', 'About3', 'Contact3'] },
  //       { title: '8', content: ['Home8', 'About3', 'Contact3'] },
  //       { title: '8', content: ['Home8', 'About3', 'Contact3'] },
  //       { title: '8', content: ['Home8', 'About3', 'Contact3'] },
  //     ],
  //   },
  // ]

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) setLogin(true)
  }, [])

  return (
    <HeaderSection $showheader={showHeader}>
      <ElementRow>
        <ElementColumn>
          <NavLink href={'/'}>
            <Image src={logo} width={120} height={40} alt="Logo" />
          </NavLink>
        </ElementColumn>
        <ElementColumn>
          <LayoutMenu>
            <MenuUl>
              <MenuLi>
                <NavLink href={'/categories'}>CATEGORIES</NavLink>
              </MenuLi>
              <MenuLi>
                <NavLink href="#">SHOP</NavLink>
              </MenuLi>
              <MenuLi>
                <NavLink href="#">PAGES</NavLink>
              </MenuLi>
              <MenuLi>
                <NavLink href="#">BLOG</NavLink>
              </MenuLi>
              <MenuLi>
                <NavLink href="#">CONTACT US</NavLink>
              </MenuLi>
            </MenuUl>
          </LayoutMenu>
        </ElementColumn>
        <ElementColumn>
          <Searchbar />
        </ElementColumn>
        <ElementColumn>
          {login ? (
            <HeaderButton href="#" onClick={() => setAccountActive(!accountActive)}>
              <AccountIcon />
            </HeaderButton>
          ) : (
            <HeaderButton href="#" onClick={() => setLoginActive(!loginActive)}>
              <AccountIcon />
            </HeaderButton>
          )}
          {accountActive && <AccountDialog />}
          {loginActive && <Login setLoginActive={setLoginActive} />}
          <HeaderButton href={'/wishlist'}>
            <HeartIcon />
            <IconSpan>{wishlist.length}</IconSpan>
          </HeaderButton>
          <HeaderButton href="#" onClick={() => setCartActive(true)}>
            <CartIcon />
            <IconSpan>{cartProducts.length}</IconSpan>
          </HeaderButton>
        </ElementColumn>
      </ElementRow>
      {cartActive && <ShoppingCart setCartActive={setCartActive} />}
    </HeaderSection>
  )
}
