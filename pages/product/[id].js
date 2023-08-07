import Center from '@/components/Center'
import Header from '@/components/Header'
import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'
import styled from 'styled-components'
import ProductImages from '@/components/ProductImages'
import { useContext } from 'react'
import { CartContext } from '@/components/CartContext'
import Breadcrumb from '@/components/BreakCrumb'
import EntrySummary from '@/components/EntrySummary'

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

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext)
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
        <WhiteBox>Thông tin chi tiết</WhiteBox>
        <WhiteBox>Sản phẩm tương tự</WhiteBox>
        <WhiteBox>Mô tả sản phẩm </WhiteBox>
        <WhiteBox>Đánh giá - Nhận xét từ khách hàng </WhiteBox>
      </Center>
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
