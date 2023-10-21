import Header from '@/components/Common/Header'
import Head from 'next/head'
import React, { useState } from 'react'
import Footer from '@/components/Common/Footer'
import Breadcrumb from '@/components/Common/BreakCrumb'
import { Input } from '@/components/AddressForm'
import styled from 'styled-components'
import Button from '@/components/Common/Button'
import AXIOS from '@/lib/axios'
import { Container } from './cart'

const status = [
  { value: 1, label: 'Đang chờ xác nhận' },
  { value: 2, label: 'Đã xác nhận, chờ vận chuyển' },
  { value: 3, label: 'Đang vận chuyên' },
  { value: 4, label: 'Giao hàng thành công' },
]
const breadcrumbItems = [
  { label: 'Trang chủ', url: '/' },
  { label: 'Theo dõi đơn hàng', url: '/' },
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
const Typo = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`
const OrderContainer = styled.div`
  margin: 20px 40px 10px 40px;
  padding: 40px 60px;
  border: 1px solid #000000;
  border-radius: 4px;
`
const OrderLabel = styled.div`
  font-size: 16px;
  color: #000000;
  margin-bottom: 10px;
  & > span {
    color: #666;
  }
`
const OrderTracking = () => {
  const [error, setError] = useState()
  const [success, setSuccess] = useState(false)
  const [orderId, setOrderId] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await AXIOS.get(`/sales/order/${orderId}`)
      setSuccess(response.data)
      setError()
    } catch (error) {
      setError(error.response?.data?.message)
      setSuccess()
    }
  }

  return (
    <>
      <Head>
        <title>Theo dõi đơn hàng</title>
      </Head>
      <Header />

      <Container>
        <Breadcrumb items={breadcrumbItems} />
        {error && <Error>{error}</Error>}
        <Typo>
          Để theo dõi đơn hàng của bạn, vui lòng nhập Mã đơn hàng của bạn vào ô bên dưới và nhấn nút
          &#34;Theo dõi&#34;.
        </Typo>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Mã đơn hàng"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />
          <Button $orange>Theo dõi</Button>
        </Form>
      </Container>
      {success && (
        <OrderContainer>
          <OrderLabel>
            Mã đơn hàng: <span>{success._id}</span>
          </OrderLabel>
          <OrderLabel>
            Địa chỉ:
            <span>
              {success.address}, {success.ward}, {success.district}, {success.province}
            </span>
          </OrderLabel>
          {success?.status && (
            <OrderLabel>
              Tình trạng đơn hàng:
              <span> {status.find((item) => item.value === success.status).label}</span>
            </OrderLabel>
          )}
          <OrderLabel>
            Phương thức thanh toán: <span>{success.paid == false ? 'COD' : 'VNPAY'}</span>
          </OrderLabel>
          <OrderLabel>
            Sản phẩm:
            {success.products?.map((item, index) => (
              <Typo key={index}>
                {item.name} x {item.quantity} = {(item.cost * item.quantity).toLocaleString()} đ
              </Typo>
            ))}
          </OrderLabel>
          <OrderLabel>Tổng tiền: {success.cost.toLocaleString()} đ</OrderLabel>
        </OrderContainer>
      )}

      <Footer />
    </>
  )
}
export default OrderTracking
