import Header from '@/components/Common/Header'
import Head from 'next/head'
import React from 'react'
import { Container } from '../cart'
import { Footer } from '@/components/Common/Footer'
import { Columns } from '../account'

const lostpassword = () => {
  return (
    <>
      <Head>
        <title>Tài khoản</title>
      </Head>
      <Header />
      <Container>
        <Columns $column="0.5fr">
          <div>11</div>
        </Columns>
      </Container>
      <Footer />
    </>
  )
}
export default lostpassword
