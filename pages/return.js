import Header from '@/components/Common/Header'
import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Container, EmptyCart, EmptyCartButton, EmptyCartTitle } from './cart'
import { CloseIcon } from '@/components/icons/Icon'
import Footer from '@/components/Common/Footer'
import ScrollUp from '@/components/ScrollUp'
import Breadcrumb from '@/components/Common/BreakCrumb'
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

const Checkout = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const { cartProducts, removeProduct, clearCart } = useContext(CartContext)
  const [info, setInfo] = useState({})

  const checkPaymentReturn = async (query) => {
    const response = await AXIOS.get(`/payment/vnpay_return${query}`)
    if (response.data.code == '00') {
      clearCart()
      setIsSuccess(true)
      router.replace(router.pathname, router.pathname, { shallow: true })
    } else alert('Thanh toán không thành công')
  }

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
        <ColumnsWrapper></ColumnsWrapper>
      </Container>
      <Footer />
      <ScrollUp />
    </>
  )
}
export default Checkout
