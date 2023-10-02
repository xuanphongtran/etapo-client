import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

const Nav = styled(Link)`
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
  cursor: pointer;
`
export const NavLink = ({ children, href }) => {
  return <Nav href={href}>{children}</Nav>
}
