import { Banner } from '@/components/Banner'
import BestProducts from '@/components/BestProducts'
import Featured from '@/components/Featured'
import Header from '@/components/Common/Header'
import { ScrollUp } from '@/components/Common/ScrollUp'
import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'
import { styled } from 'styled-components'
import { Footer } from '@/components/Common/Footer'

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
  const featuredProductId = '64a316c9384b74c2b1a72f71'
  await mongooseConnect()
  const featuredProduct = await Product.findById(featuredProductId)
  const bestProducts = await Product.find({}, null, { sort: { _id: -1 }, limit: 10 })
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      bestProducts: JSON.parse(JSON.stringify(bestProducts)),
    },
  }
}
