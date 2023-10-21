import Header from '@/components/Common/Header'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { CartTotal, Container, SubTotal, Total } from './cart'
import Footer from '@/components/Common/Footer'
import ScrollUp from '@/components/ScrollUp'
import Breadcrumb from '@/components/Common/BreakCrumb'
import { Form, Input, Label, Select } from '@/components/AddressForm'
import Button from '@/components/Common/Button'
import { CartContext } from '@/components/CartContext'
import axios from 'axios'
import AXIOS from '@/lib/axios'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import RadioCheckbox from '@/components/Common/RadioCheckbox'
import { useRouter } from 'next/router'
import { Overlay, Spinner } from './return'

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
  const { cartProducts } = useContext(CartContext)
  const [isLoading, setIsLoading] = useState(true)

  const [products, setProducts] = useState([])
  const [counts, setCounts] = useState(1)
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [select, setSelect] = useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm()

  const goToPayment = async (data) => {
    let productsData = []
    products.map((a) => {
      productsData.push({
        cost: a.discount
          ? ((Number(product.price.replace(/,/g, '')) * (100 - product.discount)) / 100) *
            counts[product._id]
          : counts[a._id] * Number(a.price.replace(/,/g, '')),
        productId: a._id,
        quantity: counts[a._id],
      })
    })
    if (!select) {
      const response = await AXIOS.post('/sales/createOrder', {
        cost: total,
        products: productsData,
        paid: false,
        delFlag: 0,
        status: 1,
        ...data,
      })
      if (response.status === 200) {
        router.push({
          pathname: '/return',
          query: { status: 'success' },
        })
      }
    } else {
      const orderResponse = await AXIOS.post('/sales/createOrder', {
        cost: total,
        products: productsData,
        paid: false,
        delFlag: 0,
        status: 1,
        ...data,
      })
      const paymentResponse = await AXIOS.post('/payment/create_payment_url', {
        amount: total,
        orderType: '100000',
        orderDescription: orderResponse.data.userId,
      })

      if (paymentResponse.status == 200) {
        window.location.href = paymentResponse.data
      } else {
        // Handle other types of responses
        console.log('Payment creation successful, but no redirect.')
      }
    }
  }

  const handleOptionChange = (value) => {
    setSelect(value)
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

  const fetchDistricts = async (provinceCode, district) => {
    try {
      const response = await axios.get(
        `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`,
      )
      setDistricts(response.data.districts)
      setValue('district', district)
    } catch (error) {
      console.error('Error fetching districts:', error)
    }
  }

  const fetchWards = async (districtCode, ward) => {
    try {
      const response = await axios.get(
        `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`,
      )
      setWards(response.data.wards)
      setValue('ward', ward)
    } catch (error) {
      console.error('Error fetching wards:', error)
    }
  }

  const onProvinceChange = (event) => {
    fetchDistricts(event.target.value)
  }

  const onDistrictChange = (event) => {
    fetchWards(event.target.value)
  }

  useEffect(() => {
    axios.get('https://provinces.open-api.vn/api/').then((response) => {
      setProvinces(response.data)
    })
    const token = localStorage.getItem('accessToken')
    if (token) {
      AXIOS.get('/auth/userinfo')
        .then((response) => {
          const a = response.data
          fetchDistricts(a?.province, a?.district)
          fetchWards(a?.district, a?.ward)
          setValue('fullName', a.name)
          setValue('companyName', a?.companyName)
          setValue('province', a?.province)
          setValue('address', a?.address)
          setValue('phoneNumber', a?.phoneNumber)
          setValue('email', a?.email)
          setIsLoading(false)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    setIsLoading(false)
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

  return (
    <>
      <Head>
        <title>Thanh toán</title>
      </Head>
      <Header />
      {isLoading ? (
        <Overlay>
          <Spinner />
        </Overlay>
      ) : (
        <Container>
          <Breadcrumb items={breadcrumbItems} />
          <Form $width="100%" onSubmit={handleSubmit(goToPayment)}>
            <ColumnsWrapper>
              <div>
                <Label $required>Họ và tên</Label>
                <Input
                  type="text"
                  placeholder="Họ và tên"
                  {...register('fullName', { required: true })}
                />
                <Label>Tên công ty (Nếu có)</Label>
                <Input type="text" placeholder="Tên công ty" {...register('companyName')} />
                <Label $required>Tỉnh thành phố</Label>
                <Select {...register('province', { required: true })} onChange={onProvinceChange}>
                  <option value="">Chọn tỉnh/thành phố</option>
                  {provinces.map((a) => (
                    <option key={a.code} value={a.code}>
                      {a.name}
                    </option>
                  ))}
                </Select>
                <Label $required>Quận/huyện</Label>
                <Select {...register('district', { required: true })} onChange={onDistrictChange}>
                  <option value="">Chọn quận/huyện</option>
                  {districts.map((a) => (
                    <option key={a.code} value={a.code}>
                      {a.name}
                    </option>
                  ))}
                </Select>
                <Label $required>Phường/xã</Label>
                <Select {...register('ward', { required: true })}>
                  <option value="">Chọn phường/xã</option>
                  {wards.map((a) => (
                    <option key={a.code} value={a.code}>
                      {a.name}
                    </option>
                  ))}
                </Select>
                <Label $required>Địa chỉ</Label>
                <Input
                  type="text"
                  placeholder="Địa chỉ"
                  {...register('address', { required: true })}
                />
                <Label $required>Số điện thoại</Label>
                <Input
                  type="number"
                  placeholder="Số điện thoại"
                  {...register('phoneNumber', { required: true })}
                />
                <Label $required>Email</Label>
                <Input
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                  type="email"
                  placeholder="Email"
                  required
                />
              </div>
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
                  <div>
                    <RadioCheckbox isSelected={select} onSelectChange={handleOptionChange} />
                  </div>
                  <Button $orange $width="100%" $padding="15px 15px" type="submit">
                    Đặt hàng
                  </Button>
                </CartTotal>
              </div>
            </ColumnsWrapper>
          </Form>
        </Container>
      )}

      <Footer />
      <ScrollUp />
    </>
  )
}
export default Checkout
