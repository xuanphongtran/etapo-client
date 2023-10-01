import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { RightIcon } from '../icons/Icon'

const BreadcrumbWrapper = styled.ul`
  list-style-type: none;
  display: flex;
  padding: 10px 0;
  margin: 0;
  align-items: center;
  background-color: #fff;
  width: 100%;
  height: 30px;
`

const BreadcrumbItem = styled.li`
  margin-right: 8px;
`

const BreadcrumbLink = styled(Link)`
  text-decoration: none;
  color: #999;
  cursor: pointer;
  &:hover {
    color: #ff782c;
  }
`

const BreadcrumbSeparator = styled.span`
  margin: 0 8px;
  svg {
    height: 12px;
  }
`

const Breadcrumb = ({ items }) => {
  const otherItems = items[items.length - 1]
  return (
    <BreadcrumbWrapper>
      {items.slice(0, -1).map((item, index) => (
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
      <BreadcrumbItem>
        <div href={otherItems.url}>{otherItems.label}</div>
      </BreadcrumbItem>
    </BreadcrumbWrapper>
  )
}

export default Breadcrumb
