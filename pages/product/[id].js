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
import WhiteBox from '@/components/WhiteBox'
import { CartIcon } from '@/components/icons/Icon'
import Breadcrumb from '@/components/BreakCrumb'

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 140px 0;
`
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`
const Price = styled.span`
  font-size: 1.4rem;
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
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <div>
                <Price>${product.price}</Price>
              </div>
              <div>
                <Button onClick={() => addProduct(product._id)}>
                  <CartIcon />
                  Add to cart
                </Button>
              </div>
            </PriceRow>
            s
          </div>
        </ColWrapper>
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
