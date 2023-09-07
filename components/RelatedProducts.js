import React from 'react'
import { styled } from 'styled-components'

const RelatedProduct = styled.section`
  width: 1290px;
  margin: auto;
`
const Title = styled.h2`
  &:after {
    content: 'Dm';
    position: absolute;
    color: #ff782c;
  }
`
const RelatedProducts = () => {
  return (
    <RelatedProduct>
      <Title>Related Products</Title>
    </RelatedProduct>
  )
}

export default RelatedProducts
