/* eslint-disable @next/next/no-img-element */
import Header from '@/components/Common/Header'
import styled from 'styled-components'
import Button, { ButtonStyle } from '@/components/Common/Button'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '@/components/CartContext'
import { CloseIcon } from '@/components/icons/Icon'
import { Count } from '@/components/ProductInfor/EntrySummary'
import { NavLink } from '@/components/Common/NavLink'
import Table from '@/components/Table'
import Breadcrumb from '@/components/Common/BreakCrumb'
import ButtonLink from '@/components/Common/ButtonLink'
import Footer from '@/components/Common/Footer'
import ScrollUp from '@/components/ScrollUp'
import Head from 'next/head'
import axios from 'axios'

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
    color: ${(props) => (props.$success ? '#28a745' : '#999999')};
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
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.6fr;
  }
  gap: 80px;
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
export const CartTotal = styled.div`
  padding: 30px 30px 40px;
  position: relative;
  border: 6px solid #e5e5e5;
  border-radius: 5px;
  h3 {
    width: 100%;
    display: flex;
    font-size: 28px;
    margin: 0 0 20px;
  }
`
export const SubTotal = styled.div`
  border-top: 1px dashed #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  padding: 20px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  & > div,
  span {
    font-size: 18px;
  }
`
export const Total = styled.div`
  border-bottom: 1px dashed #e5e5e5;
  padding: 24px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  & > div {
    font-size: 18px;
  }
  & > span {
    font-size: 24px;
    color: #ff782c;
  }
`
const breadcrumbItems = [
  { label: 'Trang chủ', url: '/' },
  { label: 'Giỏ hàng', url: '/cart' },
]
const CartPage = () => {
  const { cartProducts, removeProduct, clearCart } = useContext(CartContext)
  const [products, setProducts] = useState([])
  const [counts, setCounts] = useState(1)
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts }).then((response) => {
        setProducts(response.data)
      })
      const count = {}
      cartProducts.forEach((id) => {
        count[id] = (count[id] || 0) + 1
      })
      setCounts(count)
      console.log(cartProducts)
    } else {
      setProducts([])
      setCounts()
    }
  }, [cartProducts])

  const increment = (productId) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: (prevCounts[productId] || 0) + 1,
    }))
  }

  const decrement = (productId) => {
    if (counts[productId] > 0) {
      setCounts((prevCounts) => ({
        ...prevCounts,
        [productId]: prevCounts[productId] - 1,
      }))
    }
  }

  let total = 0
  if (counts) {
    for (const product of products) {
      if (product.discount) {
        total +=
          (counts[product._id] *
            Number(product.price.replace(/,/g, '')) *
            (100 - product.discount)) /
          100
      } else total += counts[product._id] * Number(product.price.replace(/,/g, ''))
    }
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
                      <td>
                        {product.discount
                          ? (
                              (Number(product.price.replace(/,/g, '')) * (100 - product.discount)) /
                              100
                            ).toLocaleString()
                          : product.price}
                        đ
                      </td>
                      <td>
                        <CounterContainer>
                          <Button $decrement="true" onClick={() => decrement(product._id)}>
                            -
                          </Button>
                          <Count>{counts[product._id]}</Count>
                          <Button $increment="true" onClick={() => increment(product._id)}>
                            +
                          </Button>
                        </CounterContainer>
                      </td>
                      <td>
                        <Price>
                          {product.discount
                            ? (
                                ((Number(product.price.replace(/,/g, '')) *
                                  (100 - product.discount)) /
                                  100) *
                                counts[product._id]
                              ).toLocaleString()
                            : (
                                counts[product._id] * Number(product.price.replace(/,/g, ''))
                              ).toLocaleString()}
                          đ
                        </Price>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Box>
            <Box>
              <CartTotal>
                <h3>Thanh toán</h3>
                <SubTotal>
                  <div>Tổng tiền hàng</div>
                  <span>{total?.toLocaleString()}đ</span>
                </SubTotal>
                <Total>
                  <div>Tổng thanh toán</div>
                  <span>{total?.toLocaleString()}đ</span>
                </Total>
                <ButtonLink $orange $width="90%" $padding="15px 15px" href="/checkout">
                  Mua hàng
                </ButtonLink>
              </CartTotal>
            </Box>
          </ColumnsWrapper>
        )}
      </Container>
      <Footer />
      <ScrollUp />
    </>
  )
}

export default CartPage
