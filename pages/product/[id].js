import Header from '@/components/Common/Header'
import Center from '@/components/Common/Center'
import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'
import styled from 'styled-components'
import ProductImages from '@/components/ProductImages'
import Breadcrumb from '@/components/Common/BreakCrumb'
import EntrySummary from '@/components/ProductInfor/EntrySummary'
import { ElementorShapeBottom, ElementorShapeTop } from '@/components/icons/ElementorShape'
import RelatedProducts from '@/components/RelatedProducts'
import Button from '@/components/Common/Button'
import { ScrollUp } from '@/components/Common/ScrollUp'
import { TabsContent } from '@/components/ProductInfor/TabsContent'
import { useState } from 'react'

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
const TabsButton = styled.div`
  max-width: 500px;
  margin: 40px auto;
  display: flex;
  gap: 16px;
  align-items: flex-end;
`

export default function ProductPage({ product }) {
  const [activeTab, setActiveTab] = useState(1)
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
        <TabsButton>
          <Button onClick={() => setActiveTab(1)}>Description</Button>
          <Button onClick={() => setActiveTab(2)}>Additional Information</Button>
          <Button onClick={() => setActiveTab(3)}>Review</Button>
        </TabsButton>
        <TabsContent activeTab={activeTab}></TabsContent>
        <ElementorShapeBottom />
      </TabsWrapper>
      <RelatedProducts />
      <ScrollUp />
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
