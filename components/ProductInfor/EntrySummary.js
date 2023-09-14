import React, { useContext, useState } from 'react'
import { styled } from 'styled-components'
import { CartIcon, HeartIcon } from '../icons/Icon'
import Button from '../Common/Button'
import Rating from '../Common/Rating'
import { CartContext } from '../CartContext'
import { NavLink } from '../Common/NavLink'

const EntrySummaryTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`
const InventoryStatus = styled.span`
  font-weight: 600;
  font-size: 14px;
  text-transform: capitalize;
  padding: 5px 10px 5px 13px;
  border-radius: 4px 4px 8px 8px;
  background-color: #39b54a;
  color: #fff;
  clip-path: polygon(0 0, 100% 0, 97% 100%, 4% 100%);
`
const Title = styled.h1`
  font-size: 1.25em;
`
const ProductAfterTitle = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
  font-size: 14px;
  position: relative;
  *:not(:last-child):after {
    content: '';
    height: 11px;
    width: 1px;
    background-color: #999999;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`
const ProductBrand = styled.div`
  margin-right: 15px;
  padding-right: 15px;
  position: relative;
  color: #999999;
`

const PriceRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-end;
  border-radius: 10px;
  margin: 16px 0;
`
const CurrentPrice = styled.div`
  color: #ff782c;
  font-size: 30px;
  margin-right: 8px;
  font-weight: 500;
`
const ListPrice = styled.div`
  color: #808089;
  text-decoration: line-through;
  font-size: 30px;
`
const DiscountRate = styled.div`
  margin: 3px 0 0 4px;
  padding: 0px 4px;
  font-size: 14px;
  font-weight: 500;
  color: #ff424e;
  line-height: 30px;
`
const CartForm = styled.form`
  border: 1px dashed #e5e5e5;
  border-radius: 4px;
  padding: 20px 30px;
  display: flex;
  gap: 10px;
  align-items: center;
`
const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 50px;
`
const Count = styled.span`
  font-size: 18px;
`

export default function EntrySummary({ product }) {
  const { addProduct } = useContext(CartContext)
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(count + 1)
  }
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  return (
    <div>
      <EntrySummaryTop>
        <InventoryStatus>In-stock</InventoryStatus>
      </EntrySummaryTop>
      <Title>{product.name}</Title>
      <ProductAfterTitle>
        <ProductBrand>
          Brands: <NavLink href="#">Ark Knight</NavLink>
        </ProductBrand>
        <ProductBrand>SKU: {product._id?.toUpperCase()}</ProductBrand>
      </ProductAfterTitle>
      <PriceRow>
        <CurrentPrice>{product.price?.toLocaleString()}đ</CurrentPrice>
        <ListPrice>{product.price?.toLocaleString()}đ</ListPrice>
        <DiscountRate>10%</DiscountRate>
      </PriceRow>
      <Rating value={4} />
      <CartForm>
        <CounterContainer>
          <Button decrement onClick={() => console.log(count + 1)}>
            -
          </Button>
          <Count>{count}</Count>
          <Button
            increment
            onClick={() => {
              if (count > 0) {
                setCount(count - 1)
              }
            }}
          >
            +
          </Button>
        </CounterContainer>
        <Button primary onClick={() => addProduct(product._id)}>
          <CartIcon />
          Add to cart
        </Button>
        <Button>
          <HeartIcon />
          Add to whislist
        </Button>
      </CartForm>
    </div>
  )
}