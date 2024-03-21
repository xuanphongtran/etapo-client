import styled from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { CloseIcon } from '../icons/Icon'
import ButtonLink from './ButtonLink'
import { NavLink } from './NavLink'

const CartOverLay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 997;
`
const CartContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  overflow: hidden;
  overflow-y: auto;
  width: 340px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  right: 0;
  z-index: 999999999;
`
const CartHeading = styled.div`
  display: flex;
  flex: 0 0 auto;
  padding: 15px;
`
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
