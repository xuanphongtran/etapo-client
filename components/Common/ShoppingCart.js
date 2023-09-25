import styled from 'styled-components'
import Button from './Button'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../CartContext'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { CloseIcon } from '../icons/Icon'
import ButtonLink from './ButtonLink'

const CartOverLay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  /* z-index: 997; */
`
const CartContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  overflow: hidden;
  overflow-y: auto;
  width: 340px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  right: 0;
  z-index: 999999999;
`
const CartHeading = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #e5e5e5;
`
const CartTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
`
const CloseButton = styled.a`
  font-size: 16px;
  font-weight: 700;
  line-height: 21px;
  display: flex;

  svg {
    margin-left: 3px;
    height: 20px;
  }
  cursor: pointer;
  &:hover {
    color: #ff782c !important;
  }
`
const CartContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`
const CartList = styled.div`
  position: relative;
  flex: 1 1 auto;
  overflow-y: auto;
`
const CartUl = styled.ul`
  position: absolute;
  margin: 0;
  padding: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  overflow-x: hidden;
`
const CartLi = styled.li`
  padding: 15px 30px 15px 15px;
  list-style-type: none;
  display: flex;
  &:hover {
    background-color: #f7f7f7;
  }
`
const ProductImageBox = styled.div`
  margin-right: 14px;
`
const ProductTitle = styled.div`
  text-decoration: none;
  font-size: 16px;
  font-weight: 700;
  &:hover {
    color: #ff782c;
  }
  &:visited {
    color: #000000 !important;
  }
`
const Price = styled.div`
  color: #999999;
  margin-left: 5px;
  font-weight: 700;
`
const Quantity = styled.div`
  display: flex;
  font-size: 14px;
  margin: 8px 0;
`
const CartTotal = styled.div`
  padding: 15px;
  margin: 0;
  border-top: 1px solid #e5e5e5;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
`
const TotalTitle = styled.div`
  font-size: 18px;
`
const TotalValue = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #ff782c;
`
const CartButton = styled.div`
  gap: 10px;
  padding: 0 15px 10px 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
`
const RemoveButton = styled.div`
  position: relative;
  bottom: 60px;
  left: 220px;
  &:hover {
    color: #ff782c;
  }
  svg {
    height: 16px;
  }
`
const Empty = styled.div`
  text-align: center;
  font-size: 20px;
  margin: 30px;
  color: #999999;
`
const ShoppingCart = ({ setCartActive }) => {
  const { cartProducts, removeProduct, clearCart } = useContext(CartContext)
  const [products, setProducts] = useState([])
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts }).then((response) => {
        setProducts(response.data)
      })
    } else {
      setProducts([])
    }
  }, [cartProducts])
  let total = 0
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || '0'
    const formatPrice = Number(price.replace(/,/g, ''))
    total += formatPrice
  }

  return (
    <div>
      <CartContainer>
        <CartHeading>
          <CartTitle>Shopping Cart</CartTitle>
          <CloseButton onClick={() => setCartActive(false)}>
            CLOSE <CloseIcon />
          </CloseButton>
        </CartHeading>
        {!cartProducts?.length && <Empty>No products in the cart.</Empty>}
        {products?.length > 0 && (
          <CartContent>
            <CartList>
              <CartUl>
                {products.map((product, index) => (
                  <CartLi key={index}>
                    <ProductImageBox>
                      <Image src={product.images?.[0]} width={60} height={60} alt="Image" />
                    </ProductImageBox>
                    <div>
                      <ProductTitle>{product.name}</ProductTitle>
                      <Quantity>
                        {cartProducts.filter((id) => id === product._id).length} x
                        <Price>{product.price} đ</Price>
                      </Quantity>
                      <RemoveButton onClick={() => removeProduct(product._id)}>
                        <CloseIcon />
                      </RemoveButton>
                    </div>
                  </CartLi>
                ))}
              </CartUl>
            </CartList>
            <CartTotal>
              <TotalTitle>Subtotal: </TotalTitle>
              <TotalValue>{total.toLocaleString()} đ</TotalValue>
            </CartTotal>
            <CartButton>
              <ButtonLink $hover="#e5e5e5" $background="#f7f7f7" href={'/cart'}>
                VIEW CART
              </ButtonLink>
              <Button $hover="none" $background="#ff782c" $color="white">
                CHECKOUT
              </Button>
            </CartButton>
          </CartContent>
        )}
      </CartContainer>
      <CartOverLay />
    </div>
  )
}

export default ShoppingCart
