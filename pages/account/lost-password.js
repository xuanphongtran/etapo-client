import Header from '@/components/Common/Header'
import Head from 'next/head'
import React, { useState } from 'react'
import { Container } from '../cart'
import Footer from '@/components/Common/Footer'
import Breadcrumb from '@/components/Common/BreakCrumb'
import { Input } from '@/components/AddressForm'
import styled from 'styled-components'
import Button from '@/components/Common/Button'
import AXIOS from '@/lib/axios'

const breadcrumbItems = [
  { label: 'Trang chủ', url: '/' },
  { label: 'Tài khoản', url: '/account' },
  { label: 'Quên mật khẩu', url: '/' },
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
const LostPassword = () => {
  const [error, setError] = useState()
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await AXIOS.post('/auth/lostpassword', { email })
      setSuccess(response.data)
      setError()
    } catch (error) {
      setError(error.response?.data)
      setSuccess()
    }
  }
  return (
    <>
      <Head>
        <title>Quên mật khẩu</title>
      </Head>
      <Header />
      {success ? (
        <Container>
          <Breadcrumb items={breadcrumbItems} />
          <Success>{success}</Success>
          <Typo>
            Email đặt lại mật khẩu đã được gửi đến địa chỉ email trong hồ sơ cho tài khoản của bạn,
            nhưng có thể mất vài phút để hiển thị trong hộp thư đến của bạn.
          </Typo>
        </Container>
      ) : (
        <Container>
          <Breadcrumb items={breadcrumbItems} />
          {error && <Error>{error}</Error>}
          <Typo>
            Bạn quên mật khẩu? Vui lòng nhập địa chỉ email của bạn. Bạn sẽ nhận được liên kết để tạo
            mật khẩu mới qua email.
          </Typo>
          <Form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
export default LostPassword
