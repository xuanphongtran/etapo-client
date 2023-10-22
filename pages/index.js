import Head from 'next/head'
import AXIOS from '@/lib/axios'
import BestProducts from '@/components/Home/BestProducts'
import Featured from '@/components/Home/Featured'
import Header from '@/components/Common/Header'
import ScrollUp from '@/components/ScrollUp'
import Footer from '@/components/Common/Footer'
import { Banner } from '@/components/Common/Banner'
import { styled } from 'styled-components'
import BrowseByCategories from '@/components/Home/BrowseByCategories'
import MaybeULike from '@/components/Home/MaybeULike'

export default function HomePage({ bestProducts, categories, likeProducts }) {
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
        <Featured />
        <BestProducts products={bestProducts} />
        <BannerContainer>
          <Banner column={3} />
          <Banner column={2} />
        </BannerContainer>
        {/* <Collection products={bestProducts} /> */}
        <BrowseByCategories categories={categories} />
        <MaybeULike products={likeProducts} />
      </HomeSection>
      <Footer />
      <ScrollUp />
    </div>
  )
}

export async function getServerSideProps() {
  const bestProducts = await AXIOS.get(`/product`, { params: { pageSize: 4 } }).then(
    (response) => response.data.productWithStats,
  )
  const categories = await AXIOS.get(`/client/categories`, {
    params: { level: 2, page: 0, pageSize: 6 },
  }).then((response) => response.data.categories)
  const likeProducts = await AXIOS.get(`/product/likeproducts`).then((response) => response.data)
  return {
    props: {
      bestProducts,
      categories,
      likeProducts,
    },
  }
}
