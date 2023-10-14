import Header from '@/components/Common/Header'
import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {
  CartTotal,
  Container,
  EmptyCart,
  EmptyCartButton,
  EmptyCartTitle,
  SubTotal,
  Total,
} from './cart'
import { CloseIcon } from '@/components/icons/Icon'
import Footer from '@/components/Common/Footer'
import ScrollUp from '@/components/ScrollUp'
import Breadcrumb from '@/components/Common/BreakCrumb'
import AddressForm from '@/components/AddressForm'
import Button from '@/components/Common/Button'
import { CartContext } from '@/components/CartContext'
import axios from 'axios'
import AXIOS from '@/lib/axios'
import Head from 'next/head'
import { useRouter } from 'next/router'

const breadcrumbItems = [
  { label: 'Trang chủ', url: '/' },
  { label: 'Thanh toán', url: '/' },
]
const ColumnsWrapper = styled.div`
  margin: 20px 0;
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 0.6fr;
  }
  gap: 80px;
`
const Product = styled.div`
  border-top: 1px solid #e5e5e5;
  padding: 14px 0;
  color: #666666;
  display: flex;
  justify-content: space-between;
`
const Name = styled.div``
const Price = styled.div``
const Checkout = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const { cartProducts, removeProduct, clearCart } = useContext(CartContext)
  const [products, setProducts] = useState([])
  const [counts, setCounts] = useState(1)
  const [info, setInfo] = useState({})

  const formDataRef = useRef({})
  const router = useRouter()

  const checkPaymentReturn = async (query) => {
    const response = await AXIOS.get(`/payment/vnpay_return${query}`)
    if (response.data.code == '00') {
      clearCart()
      setIsSuccess(true)
      router.replace(router.pathname, router.pathname, { shallow: true })
    } else alert('Thanh toán không thành công')
  }

  const goToPayment = async () => {
    const formData = formDataRef.current.getData()
    const response = await AXIOS.post('/payment/create_payment_url', {
      amount: total,
      orderDescription: 'Other',
      orderType: '100000',
    })
    if (response.status == 200) {
      window.location.href = response.data
    } else {
      // Handle other types of responses
      console.log('Payment creation successful, but no redirect.')
    }
  }

  let total = 0
  if (counts) {
    for (const product of products) {
      total += counts[product._id] * Number(product.price.replace(/,/g, ''))
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      AXIOS.get('/auth/userinfo')
        .then((response) => {
          setInfo(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    } else setInfo({})
  }, [])

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
    } else {
      setProducts([])
      setCounts()
    }
  }, [cartProducts])

  useEffect(() => {
    if (router.asPath.includes('?')) {
      const query = router?.asPath?.replace('/checkout', '')
      if (query) {
        checkPaymentReturn(query)
      }
    }
  }, [])

  if (isSuccess) {
    return (
      <>
        <Header />
        <Container>
          <EmptyCart>
            <CloseIcon />
            <EmptyCartTitle>Giỏ hàng của bạn đang trống</EmptyCartTitle>
            <EmptyCartButton $background="#ff782c" $color="#ffffff" $hover="#000000" href={'/'}>
              Trở về trang chủ
            </EmptyCartButton>
          </EmptyCart>
        </Container>
        <Footer />
      </>
    )
  }
  return (
    <>
      <Head>
        <title>Thanh toán</title>
      </Head>
      <Header />
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <ColumnsWrapper>
          <AddressForm width="100%" info={info} isCheckout={true} ref={formDataRef}></AddressForm>
          <div>
            <CartTotal>
              <h3>Thanh toán</h3>
              <SubTotal>
                <div>Sản phẩm</div>
                <span>Thành tiền</span>
              </SubTotal>
              {products.map((product, index) => (
                <Product key={index}>
                  <Name>
                    {product.name} x {counts[product._id]}
                  </Name>
                  <Price>
                    {(
                      counts[product._id] * Number(product.price.replace(/,/g, ''))
                    ).toLocaleString()}
                    đ
                  </Price>
                </Product>
              ))}
              <SubTotal>
                <div>Tổng tiền hàng</div>
                <span>{total?.toLocaleString()} đ</span>
              </SubTotal>
              <Total>
                <div>Tổng thanh toán</div>
                <span>{total?.toLocaleString()} đ</span>
              </Total>
              <Button $orange $width="100%" $padding="15px 15px" onClick={goToPayment}>
                Đặt hàng
              </Button>
            </CartTotal>
          </div>
        </ColumnsWrapper>
      </Container>
      <Footer />
      <ScrollUp />
    </>
  )
}
export default Checkout
