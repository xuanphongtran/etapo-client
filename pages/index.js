import { Banner } from '@/components/Banner'
import BestProducts from '@/components/BestProducts'
import Featured from '@/components/Featured'
import Header from '@/components/Common/Header'
import { ScrollUp } from '@/components/Common/ScrollUp'
import { styled } from 'styled-components'
import { Footer } from '@/components/Common/Footer'
import { AXIOS } from '@/lib/axios'

export default function HomePage({ featuredProduct, bestProducts }) {
  const HomeSection = styled.div`
    background-color: #ffffff;
  `
  return (
    <div>
      <Header />
      <HomeSection>
        <Featured product={featuredProduct} />
        <BestProducts products={bestProducts} />
        <Banner columne={3} />
        <Banner columne={2} />
      </HomeSection>
      <Footer />
      <ScrollUp />
    </div>
  )
}

export async function getServerSideProps() {
  const id = '64cdb3eed08ed00f3f057af5'
  const featuredProduct = await AXIOS.get(`/client/products/${id}`).then(
    (response) => response.data,
  )
  const bestProducts = await AXIOS.get(`/client/products`).then((response) => response.data)
  return {
    props: {
      featuredProduct,
      bestProducts,
    },
  }
}
