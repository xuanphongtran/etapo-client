import Header from '@/components/Common/Header'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Container, EmptyCart, EmptyCartButton, EmptyCartTitle } from '../cart'
import Footer from '@/components/Common/Footer'
import Breadcrumb from '@/components/Common/BreakCrumb'
import { Input } from '@/components/AddressForm'
import styled from 'styled-components'
import Button from '@/components/Common/Button'
import AXIOS from '@/lib/axios'
import { Overlay, Spinner } from '../return'
import { SuccessIcon } from '@/components/icons/Icon'
import { useRouter } from 'next/router'

const breadcrumbItems = [
  { label: 'Trang chủ', url: '/' },
  { label: 'Tài khoản', url: '/account' },
  { label: 'Đặt lại mật khẩu', url: '/' },
]
const Form = styled.form`
  width: 400px;
`
const Error = styled.div`
  margin: 14px 0;
  padding: 20px;
  width: 680px;
  color: #ffffff;
  border-radius: 2px;
  border-left: 10px solid rgba(0, 0, 0, 0.15);
  background-color: #e2401c;
`
const Success = styled.div`
  margin: 20px 0;
  padding: 20px;
  width: 680px;
  color: #ffffff;
  border-radius: 2px;
  border-left: 10px solid rgba(0, 0, 0, 0.15);
  background-color: #0f834d;
`
const Typo = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`
const Reset = () => {
  const [error, setError] = useState()
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState()
  const [newPassword, setNewPassword] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = router?.asPath?.replace('/account/reset?query=', '')
      const response = await AXIOS.post(`/auth/reset`, { token, newPassword })
      setSuccess(true)
    } catch (error) {
      setError(error.response?.data)
      setSuccess(false)
    }
  }
  const checkToken = async (query) => {
    const response = await AXIOS.get(`/auth/reset${query}`)
    if (response.status === 200) {
      setIsLoading(false)
      setEmail(response.data)
    } else console.log('Có lỗi xảy ra')
  }
  useEffect(() => {
    const query = router?.asPath?.replace('/account/reset', '')
    if (query) {
      console.log(query)
      checkToken(query)
    }
  }, [router?.asPath])

  if (isLoading) {
    return (
      <Overlay>
        <Spinner />
      </Overlay>
    )
  }
  return (
    <>
      <Head>
        <title>Đặt lại mật khẩu</title>
      </Head>
      <Header />
      {success ? (
        <Container>
          <EmptyCart $success>
            <SuccessIcon />
            <EmptyCartTitle>Bạn đã đặt lại mật khẩu thành công</EmptyCartTitle>
            <EmptyCartButton
              $background="#ff782c"
              $color="#ffffff"
              $hover="#000000"
              href={'/account'}
            >
              Trở về trang đăng nhập
            </EmptyCartButton>
          </EmptyCart>
        </Container>
      ) : (
        <Container>
          <Breadcrumb items={breadcrumbItems} />
          {error && <Error>{error}</Error>}
          <Typo>Vui lòng đặt lại mật khẩu</Typo>
          <Form onSubmit={handleSubmit}>
            <Input type="email" value={email} readOnly />
            <Input
              type="password"
              placeholder="Mật khẩu"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Button $orange>Đặt lại mật khẩu</Button>
          </Form>
        </Container>
      )}

      <Footer />
    </>
  )
}
export default Reset
