import React from 'react'
import styled from 'styled-components'
import { RightIcon } from './icons/Icon'
import Link from 'next/link'

const BreadcrumbWrapper = styled.ul`
  list-style-type: none;
  display: flex;
  padding: 0 160px;
  margin: 0;
  align-items: center;
  background-color: #fff;
  width: 100%;
  height: 30px;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.1), 0 2px 6px 2px rgba(60, 64, 67, 0.15);
  position: fixed;
  top: 64px;
`

const BreadcrumbItem = styled.li`
  margin-right: 8px;
`

const BreadcrumbLink = styled(Link)`
  text-decoration: none;
  color: #000000;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const BreadcrumbSeparator = styled.span`
  margin: 0 8px;
  svg {
    height: 12px;
  }
`

const Breadcrumb = ({ items }) => {
  return (
    <BreadcrumbWrapper>
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          <BreadcrumbItem>
            <BreadcrumbLink href={item.url}>{item.label}</BreadcrumbLink>
          </BreadcrumbItem>
          {index !== items.length - 1 && (
            <BreadcrumbSeparator>
              <RightIcon />
            </BreadcrumbSeparator>
          )}
        </React.Fragment>
      ))}
    </BreadcrumbWrapper>
  )
}

export default Breadcrumb
