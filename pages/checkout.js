import Button from '@/components/Common/Button'
import Header from '@/components/Common/Header'
import Input from '@/components/Input'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Container, EmptyCart, EmptyCartButton, EmptyCartTitle } from './cart'
import { CloseIcon } from '@/components/icons/Icon'
import { Footer } from '@/components/Common/Footer'
import { ScrollUp } from '@/components/Common/ScrollUp'
import Breadcrumb from '@/components/Common/BreakCrumb'
const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`
const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px 0;
`
const breadcrumbItems = [
  { label: 'Trang chủ', url: '/' },
  { label: 'Giỏ hàng', url: '/cart' },
]
const Checkout = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [country, setCountry] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const goToPayment = async () => {
    const response = await axios.post('/api/checkout', {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    })
    if (response.data.url) {
      window.location = response.data.url
    }
  }

  useEffect(() => {
    console.log(window)
    if (typeof window === 'undefined') {
      return
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true)
      clearCart()
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
      <Header />
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <Box>
          <h2>Order information</h2>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            name="name"
            onChange={(ev) => setName(ev.target.value)}
          />
          <Input
            type="text"
            placeholder="Email"
            value={email}
            name="email"
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <CityHolder>
            <Input
              type="text"
              placeholder="City"
              value={city}
              name="city"
              onChange={(ev) => setCity(ev.target.value)}
            />
            <Input
              type="text"
              placeholder="Postal Code"
              value={postalCode}
              name="postalCode"
              onChange={(ev) => setPostalCode(ev.target.value)}
            />
          </CityHolder>
          <Input
            type="text"
            placeholder="Street Address"
            value={streetAddress}
            name="streetAddress"
            onChange={(ev) => setStreetAddress(ev.target.value)}
          />
          <Input
            type="text"
            placeholder="Country"
            value={country}
            name="country"
            onChange={(ev) => setCountry(ev.target.value)}
          />
          <Button onClick={goToPayment}>Continue to payment</Button>
        </Box>
      </Container>
      <Footer />
      <ScrollUp />
    </>
  )
}
export default Checkout
