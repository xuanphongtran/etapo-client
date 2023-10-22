'use client'

import { useContext, useState } from 'react'
import { styled } from 'styled-components'
import { CartIcon, HeartIcon } from '../icons/Icon'
import Button from '../Common/Button'
import Rating from '../Rating'
import { CartContext } from '../CartContext'
import { NavLink } from '../Common/NavLink'

const EntrySummaryTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`
const Status = styled.span`
  font-weight: 600;
  font-size: 14px;
  text-transform: capitalize;
  padding: 5px 10px 5px 13px;
  border-radius: 4px 4px 8px 8px;
  background-color: ${(props) => props.$background || '#39b54a'};
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
  margin: 16px 0 10px;
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
const CartForm = styled.div`
  border: 1px dashed #e5e5e5;
  margin-bottom: 10px;
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
export const Count = styled.span`
  font-size: 18px;
`
const EntrySummary = ({ product }) => {
  const { addProduct, addWishlist } = useContext(CartContext)
  const [count, setCount] = useState(1)
  const increment = () => {
    setCount(count + 1)
  }
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }
  return (
    <div>
      <EntrySummaryTop>
        {product?.quantity > 0 ? (
          <Status>Còn hàng</Status>
        ) : (
          <Status $background="#fcb900">Hết hàng</Status>
        )}
      </EntrySummaryTop>
      <Title>{product.name}</Title>
      <ProductAfterTitle>
        <ProductBrand>
          Thương hiệu:
          <NavLink href={{ pathname: '/categories', query: { brand: `${product?.brand?._id}` } }}>
            {product?.brand?.name}
          </NavLink>
        </ProductBrand>
        <ProductBrand>
          Danh mục:
          <NavLink
            href={{ pathname: '/categories', query: { category: `${product?.category?._id}` } }}
          >
            {product?.category?.name}
          </NavLink>
        </ProductBrand>
      </ProductAfterTitle>
      <PriceRow>
        {product.discount > 0 ? (
          <>
            <CurrentPrice>
              {(
                (Number(product.price.replace(/,/g, '')) * (100 - product.discount)) /
                100
              ).toLocaleString()}
              đ
            </CurrentPrice>
            <ListPrice>{product.price}đ</ListPrice>
            <DiscountRate>-{product.discount}%</DiscountRate>
          </>
        ) : (
          <CurrentPrice>{product.price}đ</CurrentPrice>
        )}
      </PriceRow>
      <Rating value={product?.averageStarPoint} reviewCount={product?.reviewCount} />
      {product?.quantity ? (
        <CartForm>
          <CounterContainer>
            <Button $decrement="true" onClick={decrement}>
              -
            </Button>
            <Count>{count}</Count>
            <Button $increment="true" onClick={increment}>
              +
            </Button>
          </CounterContainer>
          <Button $purple onClick={() => addProduct(product._id, count)}>
            <CartIcon />
            Thêm vào giỏ hàng
          </Button>
          <Button onClick={() => addWishlist(product._id)}>
            <HeartIcon />
          </Button>
        </CartForm>
      ) : (
        <CartForm>
          <Button $purple onClick={() => addWishlist(product._id)}>
            <HeartIcon />
            Thêm vào danh sách yêu thích
          </Button>
        </CartForm>
      )}
    </div>
  )
}

export default EntrySummary
