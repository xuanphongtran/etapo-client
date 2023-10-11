import { useState } from 'react'
import styled from 'styled-components'
import { StarIcon } from '../icons/Icon'

const StarContainer = styled.div`
  display: flex;
  color: #ffc107;
  align-items: center;
  margin: 5px 0 10px;
`
const Star = styled.span`
  & > svg {
    width: ${(props) => props.$size || '24px'};
    height: ${(props) => props.$size || '24px'};
  }
  margin-right: ${(props) => (props.$size ? '2px' : '4px')};
  color: ${(props) => (props.$active ? '#ffc107' : '#e4e4e4')};
`
const ReviewLink = styled.a`
  display: ${(props) => props.$notReview && 'none'};
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
const Rating = ({ value, $notReview, size, reviewCount }) => {
  const renderStars = () => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      const active = i <= value
      stars.push(
        <Star $size={size} key={i} $active={active}>
          <StarIcon />
        </Star>,
      )
    }
    return stars
  }
  return (
    <StarContainer>
      {renderStars()}
      <ReviewLink $notReview={$notReview}>({reviewCount} Đánh giá)</ReviewLink>
    </StarContainer>
  )
}

export const SelectedRating = ({ size, onStarClick }) => {
  const [selectedStars, setSelectedStars] = useState(0)
  const handleStarClick = (selectedValue) => {
    setSelectedStars(selectedValue)
    if (onStarClick) {
      onStarClick(selectedValue)
    }
  }

  const renderStars = () => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      const active = i <= selectedStars
      stars.push(
        <Star $isSelected $size={size} key={i} $active={active} onClick={() => handleStarClick(i)}>
          <StarIcon />
        </Star>,
      )
    }
    return stars
  }
  return <StarContainer>{renderStars()}</StarContainer>
}

export default Rating
