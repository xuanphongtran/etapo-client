import React from 'react'
import styled from 'styled-components'
import { StarIcon } from './icons/Icon'

const StarContainer = styled.div`
  display: flex;
  color: #ffc107;
  align-items: center;
  margin-bottom: 10px;
`

const Star = styled.span`
  width: 18px;
  height: 18px;
  margin-right: 4px;
  color: ${(props) => (props.active ? '#ffc107' : '#e4e4e4')};
`
const ReviewLink = styled.a`
  font-size: 0.875rem;
  line-height: 1.1666666667;
  text-transform: capitalize;
  color: #999999;
  &:hover {
    color: #ff782c !important;
  }
  &:visited {
    color: #999999;
  }
`
const Rating = ({ value }) => {
  const renderStars = () => {
    const stars = []

    for (let i = 1; i <= 5; i++) {
      const active = i <= value
      stars.push(
        <Star key={i} active={active}>
          <StarIcon />
        </Star>,
      )
    }

    return stars
  }

  return (
    <StarContainer>
      {renderStars()}
      <ReviewLink>(5 Reviews)</ReviewLink>
    </StarContainer>
  )
}

export default Rating
