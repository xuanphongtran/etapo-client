import Head from 'next/head'
import AXIOS from '@/lib/axios'
import styled from 'styled-components'
import { useState } from 'react'
import Header from '@/components/Common/Header'
import Center from '@/components/Common/Center'
import Footer from '@/components/Common/Footer'
import ProductImages from '@/components/Common/ProductImages'
import Breadcrumb from '@/components/Common/BreakCrumb'
import Button from '@/components/Common/Button'
import ScrollUp from '@/components/ScrollUp'
import EntrySummary from '@/components/ProductInfor/EntrySummary'
import TabsContent from '@/components/ProductInfor/TabsContent'
import { ElementorShapeBottom, ElementorShapeTop } from '@/components/icons/ElementorShape'
import { Banner } from '@/components/Common/Banner'
import MaybeULike from '@/components/Home/MaybeULike'

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
  padding: 10px 30px 30px 30px;
`
const TabsWrapper = styled.div`
  background-color: #f2eaea;

  & > svg {
    color: #ffffff;
  }
  & > svg:last-child {
    transform: rotate(180deg);
  }
`
const TabsButton = styled.div`
  max-width: 450px;
  justify-content: space-between;
  margin: 40px auto;
  display: flex;
  align-items: flex-end;
`
const BreadcrumbId = styled.div`
  margin-top: 130px;
  padding: 0 30px;
`
const ProductPage = ({ product, likeProducts }) => {
  const [activeTab, setActiveTab] = useState(1)
  const breadcrumbItems = [
    { label: 'Trang chủ', url: '/' },
    { label: 'Danh mục', url: '/categories' },
    { label: '1', url: `/product/${product._id}` },
  ]
  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <Header />
      <Center>
        <BreadcrumbId>
          <Breadcrumb $borderTop items={breadcrumbItems} />
        </BreadcrumbId>
        <WhiteBox>
          <ColWrapper>
            <ProductImages images={product.images} />
            <EntrySummary product={product} />
          </ColWrapper>
        </WhiteBox>
      </Center>
      <TabsWrapper>
        <ElementorShapeTop />
        <TabsButton>
          <Button $orange={activeTab === 1} onClick={() => setActiveTab(1)}>
            Mô tả
          </Button>
          <Button $orange={activeTab === 2} onClick={() => setActiveTab(2)}>
            Thông tin chi tiết
          </Button>
          <Button $orange={activeTab === 3} onClick={() => setActiveTab(3)}>
            Đánh giá từ khách hàng
          </Button>
        </TabsButton>
        <TabsContent activeTab={activeTab} product={product}></TabsContent>
        <ElementorShapeBottom />
      </TabsWrapper>
      <MaybeULike products={likeProducts} />
      <Center>
        <Banner column={3} />
      </Center>
      <Footer />
      <ScrollUp />
    </>
  )
}

export default ProductPage

export async function getServerSideProps(context) {
  const { id } = context.query
  const product = await AXIOS.get(`/product/${id}`).then((response) => response.data)
  const likeProducts = await AXIOS.get(`/product/likeproducts`).then((response) => response.data)

  return {
    props: {
      likeProducts,
      product: JSON.parse(JSON.stringify(product)),
    },
  }
}
