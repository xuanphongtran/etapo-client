import React from 'react'
import styled from 'styled-components'

const Nav = styled.a`
  text-decoration: none;
  &:hover {
    color: #ff782c !important;
  }
  &:visited {
    color: #000000;
  }
  svg {
    height: 20px;
  }
`
export const NavLink = ({ children }) => {
  return <Nav>{children}</Nav>
}
