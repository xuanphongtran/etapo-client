import Header from '@/components/Common/Header'
import Head from 'next/head'
import { Container } from './cart'
import { Footer } from '@/components/Common/Footer'
import Breadcrumb from '@/components/Common/BreakCrumb'
import { useEffect } from 'react'

const breadcrumbItems = [
  { label: 'Trang chủ', url: '/' },
  { label: 'Tài khoản', url: '/cart' },
]
const Account = () => {
  useEffect(() => {
    let token
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      token = localStorage.getItem('accessToken')
    }
    if (token) {
      console.log(token)
    } else {
      console.log(1)
    }
  }, [])
  return (
    <>
      <Head>
        <title>Tài khoản của tôi</title>
      </Head>
      <Header />
      <Container>
        <Breadcrumb items={breadcrumbItems} />
      </Container>
      <Footer />
    </>
  )
}

export default Account
