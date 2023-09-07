import styled from 'styled-components'
import { useContext, useState } from 'react'
import { CartContext } from '@/components/CartContext'
import Image from 'next/image'
import logo from '../public/logo.svg'
import { AccountIcon, CartIcon, HeartIcon, SearchIcon } from './icons/Icon'
import Searchbar from './SearchBar'

const HeaderSection = styled.section`
  top: 0;
  position: fixed;
  width: 100%;
  padding: 1rem 0;
  background-color: #ffffff;
  z-index: 980;

  /* box-shadow: 0 0 3px 0px rgba(0, 0, 0, 0.2); */
`
const ElementRow = styled.div`
  display: flex;
  height: 60px;
  padding: 0 3rem;
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
const NavLink = styled.a`
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
const IconSpan = styled.span`
  line-height: 1.5;
  font-size: 12px;
  text-align: center;
  position: absolute;
  top: -6px;
  right: 62px;
  color: #fff;
  width: 18px;
  height: 18px;
  background-color: #ff782c;
  border-radius: 50%;
`
const LayoutItem = styled.div`
  margin: 0 1rem;
  display: flex;
  align-items: center;
`
export default function Header() {
  const { cartProducts } = useContext(CartContext)
  const [mobileNavActive, setMobileNavActive] = useState(false)
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
  return (
    <HeaderSection>
      <ElementRow>
        <ElementColumn>
          <NavLink href={'/'}>
            <Image src={logo} width={120} height={40} />
          </NavLink>
        </ElementColumn>
        <ElementColumn>
          <LayoutMenu>
            <MenuUl>
              <MenuLi>
                <NavLink href="#">HOME</NavLink>
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
          <LayoutItem>
            <NavLink href="#">
              <AccountIcon />
            </NavLink>
          </LayoutItem>
          <LayoutItem>
            <NavLink href="#">
              <HeartIcon />
              <IconSpan class="count">17</IconSpan>
            </NavLink>
          </LayoutItem>
          <LayoutItem>
            <NavLink href="#">
              <CartIcon />
              <IconSpan class="count">17</IconSpan>
            </NavLink>
          </LayoutItem>
        </ElementColumn>
      </ElementRow>
    </HeaderSection>
  )
}
