import React from 'react'
import styled from 'styled-components'

const BannerContainer = styled.div`
  padding: 30px 0;
  display: grid;
  grid-template-columns: ${(props) =>
    props.$column === 3 ? '1fr 1fr 1fr' : props.$column === 2 ? '1fr 1fr' : '1fr'};
  gap: 30px;
`
const Content = styled.div`
  height: 300px;
  background-color: #666;
  border-radius: 4px;
`
export const Banner = ({ column }) => {
  return (
    <BannerContainer $column={column}>
      {[...Array(column || 1)].map((_, index) => (
        <Content key={index}></Content>
      ))}
    </BannerContainer>
  )
}
