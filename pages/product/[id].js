import Center from '@/components/Center'
import Header from '@/components/Header'
import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'
import styled from 'styled-components'
import ProductImages from '@/components/ProductImages'
import Breadcrumb from '@/components/BreakCrumb'
import EntrySummary from '@/components/EntrySummary'
import { ElementorShapeBottom, ElementorShapeTop } from '@/components/icons/ElementorShape'
import RelatedProducts from '@/components/RelatedProducts'

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
`
const WhiteBox = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  ${(props) =>
    props.first &&
    `margin-top: 114px;
    `}
`
const TabsWrapper = styled.div`
  background-color: #f2eaea;

  svg {
    color: #ffffff;
  }
  svg:last-child {
    transform: rotate(180deg);
  }
`
const TabsContent = styled.div`
  background-color: #ffffff;
  height: 200px;
  max-width: 1290px;
  margin: 120px auto;
`

export default function ProductPage({ product }) {
  const breadcrumbItems = [
    { label: 'Trang chủ', url: '/' },
    { label: 'Products', url: '/products' },
    { label: 'Category', url: '/products/category' },
    { label: '1', url: `/product/${product._id}` },
  ]
  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Center>
        <WhiteBox first={true}>
          <ColWrapper>
            <ProductImages images={product.images} />
            <EntrySummary product={product} />
          </ColWrapper>
        </WhiteBox>
      </Center>
      <TabsWrapper>
        <ElementorShapeTop />
        <TabsContent>Thông tin chi tiết</TabsContent>
        <ElementorShapeBottom />
      </TabsWrapper>
      <RelatedProducts />
    </>
  )
}

export async function getServerSideProps(context) {
  await mongooseConnect()
  const { id } = context.query
  const product = await Product.findById(id)
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  }
}
