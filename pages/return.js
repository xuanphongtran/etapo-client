import Header from '@/components/Common/Header'
import React, { useContext, useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Container, EmptyCart, EmptyCartButton, EmptyCartTitle } from './cart'
import { CloseIcon, SuccessIcon } from '@/components/icons/Icon'
import Footer from '@/components/Common/Footer'
import ScrollUp from '@/components/ScrollUp'
import { CartContext } from '@/components/CartContext'
import AXIOS from '@/lib/axios'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`
const spinAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #ffffff;
  width: 40px;
  height: 40px;
  animation: ${spinAnimation} 0.8s linear infinite;
`
const Checkout = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { clearCart } = useContext(CartContext)
  const router = useRouter()

  const checkPaymentReturn = async (query) => {
    const paymentResponse = await AXIOS.get(`/payment/vnpay_return${query}`)
    if (paymentResponse.data.code == '00') {
      const data = paymentResponse?.data
      const orderResponse = await AXIOS.put(`/sales/updateOrder`, data)
      if (orderResponse.status == 200) {
        clearCart()
        setIsLoading(false)
        router.replace(router.pathname, router.pathname, { shallow: true })
      }
    } else isSuccess(false)
  }
  useEffect(() => {
    const status = router?.query?.status
    if (status === 'success') {
      clearCart()
      setIsLoading(false)
    } else {
      const query = router?.asPath?.replace('/return', '')
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
            <SuccessIcon />
            <EmptyCartTitle>Thanh toán thất bại</EmptyCartTitle>
            <EmptyCartButton $background="#ff782c" $color="#ffffff" $hover="#000000" href={'/'}>
              Trở về trang chủ
            </EmptyCartButton>
          </EmptyCart>
        </Container>
        <Footer />
        <ScrollUp />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Thanh toán</title>
      </Head>
      {isLoading ? (
        <Overlay>
          <Spinner />
        </Overlay>
      ) : (
        <>
          <Header />
          <Container>
            <EmptyCart $success>
              <SuccessIcon />
              <EmptyCartTitle>Thanh toán thành công</EmptyCartTitle>
              <EmptyCartButton $background="#ff782c" $color="#ffffff" $hover="#000000" href={'/'}>
                Trở về trang chủ
              </EmptyCartButton>
            </EmptyCart>
          </Container>
          <Footer />
          <ScrollUp />
        </>
      )}
    </>
  )
}
export default Checkout
