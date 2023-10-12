import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import styled from 'styled-components'
import Rating from '../Rating'
import Button from './Button'
import { CartIcon, HeartIcon } from '../icons/Icon'
import { CartContext } from '../CartContext'

const Container = styled.div`
  margin-bottom: 10px;
`
const ProductTransition = styled.div`
  height: 300px;
  border: 1px dashed #e5e5e5;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  img {
    object-fit: cover;
  }
  &:hover {
    border: 1px dashed #ff782c;
    span {
      opacity: 1;
      right: 15px;
    }
    button {
      opacity: 1;
      bottom: 20px;
    }
  }
`

const AddToCartButton = styled(Button)`
  position: absolute;
  bottom: 0px;
  left: 50%;
  width: 200px;
  transform: translateX(-50%);
  opacity: 0;
  transition: all 0.5s ease;
`
const AddToWishList = styled.span`
  position: absolute;
  top: 15px;
  right: 0px;
  display: flex;
  padding: 5px;
  align-items: center;
  border: 1px solid #e5e5e5;
  border-radius: 50%;
  background-color: #ffffff;
  opacity: 0;
  transition: all 0.5s ease;
  &:hover {
    color: #ffffff;
    background-color: #ff782c;
  }
  svg {
    height: 20px;
  }
`
const ProductCaption = styled.div`
  position: relative;
  z-index: 5;
  padding-top: 16px;
  transition: all 0.3s ease;
`
const Price = styled.div`
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: 700;
  color: #6839cc;
`
const ProductTitle = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  &:hover {
    color: #ff782c !important;
  }
  &:visited {
    color: #000000;
  }
`
const ProductRating = styled(Rating)`
  margin-top: 5px;
`
export const ProductBlock = ({ product }) => {
  const { addProduct, addWishlist } = useContext(CartContext)

  return (
    <Container>
      <ProductTransition>
        <AddToWishList onClick={() => addWishlist(product._id)}>
          <HeartIcon />
        </AddToWishList>
        <Image src={product.images?.[0]} alt="" width={300} height={300} loading="lazy" />
        <AddToCartButton primary="true" onClick={() => addProduct(product._id, 1)}>
          <CartIcon />
          Add to cart
        </AddToCartButton>
      </ProductTransition>

      <ProductCaption>
        <Price>{product.price} đ</Price>
        <ProductTitle href={'/product/' + product._id}>{product.name}</ProductTitle>
        <ProductRating value={1} />
      </ProductCaption>
    </Container>
  )
}
