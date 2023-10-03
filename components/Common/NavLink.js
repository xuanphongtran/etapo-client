import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

const Nav = styled(Link)`
  color: ${(props) => props.$color || '#000000'};
  text-decoration: none;
  &:hover {
    color: #ff782c !important;
  }
  &:visited {
    color: ${(props) => props.$color || '#000000'};
  }
  svg {
    height: 20px;
  }
  cursor: pointer;
`
export const NavLink = ({ children, href, ...rest }) => {
  return (
    <Nav href={href} {...rest}>
      {children}
    </Nav>
  )
}
