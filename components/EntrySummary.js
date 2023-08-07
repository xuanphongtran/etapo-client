import React from 'react'
import { styled } from 'styled-components'
import { CartIcon } from './icons/Icon'
import Button from './Button'
import Rating from './Rating'

const EntrySummary = ({ product }) => {
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
  const NavLink = styled.a`
    text-decoration: none;
    &:hover {
      color: #ff782c !important;
    }
    &:visited {
      color: #000000;
    }
  `
  const PriceRow = styled.div`
    display: flex;
    gap: 20px;
    align-items: flex-end;
    background-color: #fafafa;
    padding: 12px 16px 12px;
    border-radius: 10px;
    margin: 16px 0;
  `
  const CurrentPrice = styled.div`
    color: #ff424e;
    font-size: 32px;
    line-height: 28px;
    margin-right: 8px;
    font-weight: 500;
  `
  const ListPrice = styled.div`
    color: #808089;
    text-decoration: line-through;
    font-size: 20px;
    line-height: 20px;
  `
  const DiscountRate = styled.div`
    font-weight: 500;
    margin-left: 4px;
    color: #ff424e;
    margin-top: 3px;
    line-height: 18px;
    font-size: 14px;
    padding: 0px 4px;
  `
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
        <ProductBrand>SKU: GORGEOUS-BRONZE-KNIFE-92284937</ProductBrand>
      </ProductAfterTitle>
      <PriceRow>
        <CurrentPrice>{product.price} đ</CurrentPrice>
        <ListPrice>111111 đ</ListPrice>
        <DiscountRate>-sadasd%</DiscountRate>
      </PriceRow>
      <Rating value={4} />

      <Button primary onClick={() => addProduct(product._id)}>
        <CartIcon />
        Add to cart
      </Button>
    </div>
  )
}

export default EntrySummary
