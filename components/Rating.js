import React from 'react'
import styled from 'styled-components'
import { StarIcon } from './icons/Icon'

const StarContainer = styled.div`
  display: flex;
  color: #ffc107;
  align-items: center;
`

const Star = styled.span`
  width: 20px;
  height: 20px;
  margin-right: 4px;
  color: ${(props) => (props.active ? '#ffc107' : '#e4e4e4')};
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
      {/* <h2>{value}</h2> */}
    </StarContainer>
  )
}

export default Rating
