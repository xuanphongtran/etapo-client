import React from 'react'
import styled from 'styled-components'

const StarContainer = styled.div`
  display: inline-block;
  color: #ffc107;
`

const Star = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 4px;
  background-color: ${(props) => (props.active ? '#ffc107' : '#e4e4e4')};
`

const Rating = ({ value }) => {
  const renderStars = () => {
    const stars = []

    for (let i = 1; i <= 5; i++) {
      const active = i <= value
      stars.push(<Star key={i} active={active} />)
    }

    return stars
  }

  return <StarContainer>{renderStars()}</StarContainer>
}

export default Rating
