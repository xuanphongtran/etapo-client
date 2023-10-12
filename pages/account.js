import styled from 'styled-components'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Header from '@/components/Common/Header'
import Footer from '@/components/Common/Footer'
import Breadcrumb from '@/components/Common/BreakCrumb'
import { Container } from './cart'
import { useRouter } from 'next/router'
import DashBoard from '@/components/Account/DashBoard'
import Orders from '@/components/Account/Orders'
import Dowloads from '@/components/Account/Dowloads'
import Addresses from '@/components/Account/Addresses'
import AccountDetails from '@/components/Account/AccountDetails'
import RegisterForm from '@/components/RegisterForm'
import { Title } from '@/components/AddressForm'
import { LoginForm } from '@/components/Login'
import { TableWishList } from './wishlist'
import {
  AccountIcon,
  BoxIcon,
  ChartIcon,
  HeartIcon,
  HomeIcon,
  LogOutIcon,
  OrdersIcon,
} from '@/components/icons/Icon'

const breadcrumbItems = [
  { label: 'Trang chủ', url: '/' },
  { label: 'Tài khoản', url: '/cart' },
]
const ItemValue = [
  { label: 'Tài khoản của tôi', value: 'dashboard', tab: 1, icon: <ChartIcon /> },
  { label: 'Đơn hàng', value: 'orders', tab: 2, icon: <BoxIcon /> },
  { label: 'Tải xuống', value: 'downloads', tab: 3, icon: <OrdersIcon /> },
  { label: 'Chỉnh sửa địa chỉ', value: 'addresses', tab: 4, icon: <HomeIcon /> },
  { label: 'Chi tiết tài khoản', value: 'accountdetails', tab: 5, icon: <AccountIcon /> },
  { label: 'Danh sách yêu thích', value: 'wishlist', tab: 6, icon: <HeartIcon /> },
]
export const Columns = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: ${(props) => props.$column || '0.4fr 1fr'};
  gap: 80px;
`
const Navigation = styled.ul`
  margin-left: 0;
  padding: 0;
  border-top: 1px solid #e5e5e5;
  list-style-type: none;
`
const Item = styled.li`
  border-bottom: 1px solid #e5e5e5;
  padding: 14px 0;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    color: #ff782c;
  }
  svg {
    height: 20px;
  }
`
const Label = styled.div`
  cursor: pointer;
`
const Content = styled.div`
  margin-top: 14px;
  /* Thêm các style khác cho phần content của bạn */
`
const AccountLogin = styled.div``
const Account = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(1)
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    setActiveTab(router.query.tab)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    window.location.reload()
  }
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [])

  if (!isLogin) {
    return (
      <>
        <Head>
          <title>Tài khoản</title>
        </Head>
        <Header />
        <Container>
          <Breadcrumb items={breadcrumbItems} />
          <Columns $column="1fr 0.8fr">
            <RegisterForm width="100%" />
            <AccountLogin>
              <Title>Đăng ký tài khoản</Title>
              <LoginForm />
            </AccountLogin>
          </Columns>
        </Container>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Tài khoản của tôi</title>
      </Head>
      <Header />
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <Columns>
          <div>
            <Navigation>
              {ItemValue.map((item, index) => (
                <Item key={index} onClick={() => setActiveTab(item.tab)}>
                  <Label>{item.label}</Label>
                  {item?.icon}
                </Item>
              ))}
              <Item onClick={handleLogout}>
                <Label>Đăng xuất</Label>
                <LogOutIcon />
              </Item>
            </Navigation>
          </div>
          <Content>
            {activeTab == 1 && <DashBoard />}
            {activeTab == 2 && <Orders />}
            {activeTab == 3 && <Dowloads />}
            {activeTab == 4 && <Addresses />}
            {activeTab == 5 && <AccountDetails />}
            {activeTab == 6 && <TableWishList />}
          </Content>
        </Columns>
      </Container>
      <Footer />
    </>
  )
}

export default Account
