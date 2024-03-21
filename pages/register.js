import Header from '@/components/Common/Header'
import Head from 'next/head'
import { Container } from './cart'
import Breadcrumb from '@/components/Common/BreakCrumb'
import { Columns } from './account'
import RegisterForm from '@/components/RegisterForm'
import Footer from '@/components/Common/Footer'
const breadcrumbItems = [
  { label: 'Trang chủ', url: '/' },
  { label: 'Đăng ký', url: '/register' },
]
const Register = () => {
  return (
    <>
      <Head>
        <title>Tài khoản</title>
      </Head>
      <Header />
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <Columns $column="0.5fr">
          <RegisterForm width="100%" />
        </Columns>
      </Container>
      <Footer />
    </>
  )
}
export default Register
