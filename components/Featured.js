/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components'
import { useContext } from 'react'
import { CartContext } from '@/components/CartContext'
import Button from './Common/Button'
import { PawPrint } from './icons/Icon'

const Bg = styled.div`
  background-color: #949494;
  color: #fff;
  height: 500px;
  padding: 50px 40px;
  margin-top: 72px;
  svg {
    height: 400px;
  }
`

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext)
  const addFeaturedToCart = () => {
    addProduct(product._id)
  }

  return (
    <Bg>
      <div>{product?.name}</div>
      <PawPrint />
    </Bg>
  )
}
