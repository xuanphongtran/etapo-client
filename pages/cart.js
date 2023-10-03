/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Header from '@/components/Common/Header'
import styled from 'styled-components'
import Button, { ButtonStyle } from '@/components/Common/Button'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '@/components/CartContext'
import Table from '@/components/Table'
import axios from 'axios'
import Breadcrumb from '@/components/Common/BreakCrumb'
import { CloseIcon } from '@/components/icons/Icon'
import ButtonLink from '@/components/Common/ButtonLink'
import { Footer } from '@/components/Common/Footer'
import { ScrollUp } from '@/components/Common/ScrollUp'
import Head from 'next/head'
import { Count } from '@/components/ProductInfor/EntrySummary'
import { NavLink } from '@/components/Common/NavLink'

export const Container = styled.div`
  margin: 100px 40px 10px 40px;
  padding: 0 60px;
`
//EmptyCart
export const EmptyCart = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  svg {
    display: inline-block;
    color: #999999;
    height: 250px;
  }
`
export const EmptyCartTitle = styled.div`
  font-size: 26px;
  margin: 30px auto;
`
export const EmptyCartButton = styled(ButtonLink)`
  margin: 30px auto;
  padding: 15px 30px !important;
  ${ButtonStyle}
`
export const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
`
const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px 0;
`
//Cart
const RemoveButton = styled.div`
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
const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #e5e5e5;
  width: 103px;
  border-radius: 50px;
`
const ProductInfoCell = styled.td`
  padding: 10px 0;
`
const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`
const Price = styled.div`
  font-weight: 700;
`

const breadcrumbItems = [
  { label: 'Trang chủ', url: '/' },
  { label: 'Giỏ hàng', url: '/cart' },
]
const CartPage = () => {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext)
  const [products, setProducts] = useState([])
  const [count, setCount] = useState(1)
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts }).then((response) => {
        setProducts(response.data)
      })
    } else {
      setProducts([])
    }
  }, [cartProducts])
  const increment = () => {
    setCount(count + 1)
  }
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  let total = 0
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0
    total += price
  }

  return (
    <>
      <Head>
        <title>Giỏ Hàng</title>
      </Head>
      <Header />
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        {!cartProducts?.length && (
          <EmptyCart>
            <CloseIcon />
            <EmptyCartTitle>Giỏ hàng của bạn đang trống</EmptyCartTitle>
            <EmptyCartButton $background="#ff782c" $color="#ffffff" $hover="#000000" href={'/'}>
              Trở về trang chủ
            </EmptyCartButton>
          </EmptyCart>
        )}
        {products?.length > 0 && (
          <ColumnsWrapper>
            <Box>
              <Table>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th>Tên sản phẩm</th>
                    <th>Giá tiền</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <RemoveButton onClick={() => removeProduct(product._id)}>
                          <CloseIcon />
                        </RemoveButton>
                      </td>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="" />
                        </ProductImageBox>
                      </ProductInfoCell>
                      <td>
                        <NavLink href={'/product/' + product._id}>{product.name}</NavLink>
                      </td>
                      <td>{product.price} đ</td>
                      <td>
                        <CounterContainer>
                          <Button $decrement="true" onClick={decrement}>
                            -
                          </Button>
                          <Count>{count}</Count>
                          <Button $increment="true" onClick={increment}>
                            +
                          </Button>
                        </CounterContainer>
                      </td>
                      <td>
                        <Price>
                          {(count * Number(product.price.replace(/,/g, ''))).toLocaleString()}đ
                        </Price>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Box>
            <Box></Box>
          </ColumnsWrapper>
        )}
      </Container>
      <Footer />
      <ScrollUp />
    </>
  )
}

export default CartPage
