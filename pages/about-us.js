import Head from 'next/head'
import Header from '@/components/Common/Header'
import ScrollUp from '@/components/ScrollUp'
import Footer from '@/components/Common/Footer'

export default function AboutUs() {
  return (
    <div>
      <Head>
        <title>Về Ziggy</title>
      </Head>
      <Header showHeader="static" />

      <Footer />
      <ScrollUp />
    </div>
  )
}
