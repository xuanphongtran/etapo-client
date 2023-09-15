/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components'
import { useContext } from 'react'
import { CartContext } from '@/components/CartContext'

const Bg = styled.div`
  background-color: #949494;
  color: #fff;
  height: 500px;
  padding: 50px 40px;
  margin-top: 72px;
`

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext)
  function addFeaturedToCart() {
    addProduct(product._id)
  }
  return (
    <Bg>
      <div>{product.name}</div>
    </Bg>
  )
}
