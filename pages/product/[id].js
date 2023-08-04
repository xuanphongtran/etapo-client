import Center from '@/components/Center'
import Header from '@/components/Header'
import Title from '@/components/Title'
import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'
import styled from 'styled-components'
import ProductImages from '@/components/ProductImages'
import Button from '@/components/Button'
import { useContext } from 'react'
import { CartContext } from '@/components/CartContext'
import { CartIcon } from '@/components/icons/Icon'
import Breadcrumb from '@/components/BreakCrumb'
import Rating from '@/components/Rating'

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
  margin-top: 10px;
  ${(props) =>
    props.first &&
    `margin-top: 110px;
    `}
`

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-end;
  background-color: #fafafa;
  padding: 12px 16px 12px;
  border-radius: 10px;
  margin: 16px 0;
`
const CurrentPrice = styled.div`
  color: #ff424e;
  font-size: 32px;
  line-height: 28px;
  margin-right: 8px;
  font-weight: 500;
`
const ListPrice = styled.div`
  color: #808089;
  text-decoration: line-through;
  font-size: 20px;
  line-height: 20px;
`
const DiscountRate = styled.div`
  font-weight: 500;
  margin-left: 4px;
  color: #ff424e;
  margin-top: 3px;
  line-height: 18px;
  font-size: 14px;
  padding: 0px 4px;
`

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext)
  const breadcrumbItems = [
    { label: 'Trang chủ', url: '/' },
    { label: 'Products', url: '/products' },
    { label: 'Category', url: '/products/category' },
    { label: product.title, url: `/product/${product._id}` },
  ]
  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Center>
        <WhiteBox first={true}>
          <ColWrapper>
            <ProductImages images={product.images} />
            <div>
              <Title>{product.title}</Title>
              <Rating value={4} />
              <PriceRow>
                <CurrentPrice>{product.price} đ</CurrentPrice>
                <ListPrice>111111 đ</ListPrice>
                <DiscountRate>-sadasd%</DiscountRate>
              </PriceRow>
              <Button primary onClick={() => addProduct(product._id)}>
                <CartIcon />
                Add to cart
              </Button>
            </div>
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
