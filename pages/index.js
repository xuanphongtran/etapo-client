import Head from 'next/head'
import AXIOS from '@/lib/axios'
import BestProducts from '@/components/BestProducts'
import Featured from '@/components/Home/Featured'
import Header from '@/components/Common/Header'
import ScrollUp from '@/components/ScrollUp'
import Footer from '@/components/Common/Footer'
import { Banner } from '@/components/Common/Banner'
import { styled } from 'styled-components'

export default function HomePage({ featuredProduct, bestProducts }) {
  const HomeSection = styled.div`
    background-color: #ffffff;
  `
  const BannerContainer = styled.div`
    margin: 0 100px;
  `
  return (
    <div>
      <Head>
        <title>Ziggy</title>
      </Head>
      <Header showHeader="static" />
      <HomeSection>
        <Featured product={featuredProduct} />
        <BestProducts products={bestProducts} />
        <BannerContainer>
          <Banner column={3} />
          <Banner column={2} />
        </BannerContainer>
      </HomeSection>
      <Footer />
      <ScrollUp />
    </div>
  )
}

export async function getServerSideProps() {
  const id = '6511a65749ad81f96d39b880'
  const featuredProduct = await AXIOS.get(`/product/${id}`).then((response) => response.data)
  const bestProducts = await AXIOS.get(`/product`).then(
    (response) => response.data.productWithStats,
  )
  return {
    props: {
      featuredProduct,
      bestProducts,
    },
  }
}
