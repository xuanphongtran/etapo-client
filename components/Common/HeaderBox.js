import styled from 'styled-components'
import { CloseIcon } from '../icons/Icon'
import { NavLink } from './NavLink'
import { CartContainer, CartHeading, CartOverLay } from '../ShoppingCart'

const CloseButton = styled.a`
  svg {
    margin-left: 3px;
    height: 20px;
  }
  cursor: pointer;
  &:hover {
    color: #ff782c !important;
  }
`
const Content = styled.div`
  flex-direction: column;
  flex: 1 1 auto;
`
const MenuUl = styled.ul`
  margin: 0;
  color: #949494;
  list-style-type: none;
`
const MenuLi = styled.li`
  padding: 10px 20px;
  display: list-item;
`
const HeaderBox = ({ setCartActive }) => {
  return (
    <div>
      <CartContainer>
        <CartHeading>
          <CloseButton onClick={() => setCartActive(false)}>
            <CloseIcon />
          </CloseButton>
        </CartHeading>
        <Content>
          <MenuUl>
            <MenuLi>
              <NavLink href={'/account'}>TÀI KHOẢN</NavLink>
            </MenuLi>
            <MenuLi>
              <NavLink href={'/wishlist'}>DANH SÁCH YÊU THÍCH</NavLink>
            </MenuLi>
            <MenuLi>
              <NavLink href={'/cart'}>GIỎ HÀNG</NavLink>
            </MenuLi>
            <MenuLi>
              <NavLink href="/categories?category=64fb11402a2f54486bdf12ab">CHÓ</NavLink>
            </MenuLi>
            <MenuLi>
              <NavLink href="/categories?category=652129ebc774dc4d93239ef5">MÈO</NavLink>
            </MenuLi>
            <MenuLi>
              <NavLink href="#">BLOG</NavLink>
            </MenuLi>
            <MenuLi>
              <NavLink href="#">VỀ CHÚNG TÔi</NavLink>
            </MenuLi>
          </MenuUl>
        </Content>
      </CartContainer>
      <CartOverLay />
    </div>
  )
}

export default HeaderBox
