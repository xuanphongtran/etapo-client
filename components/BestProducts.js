import styled from 'styled-components'
import Center from '@/components/Center'
import ProductBox from './ProductBox'
import Rating from './Rating'

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`
const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  border-radius: 4px;
  border: 1px dashed #e5e5e5;
  padding: 30px 30px 27px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`
const ProductBlock = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`
const ProductImage = styled.div`
  max-width: 80px;
  margin-right: 15px;
  img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
`
const ProductTitle = styled.h3`
  margin-bottom: 6px;
  &:hover {
    color: #ff782c !important;
  }
  &:visited {
    color: #000000;
  }
`
const Price = styled.div`
  color: #6839cc;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 6px;
`

export default function BestProducts({ products }) {
  return (
    <Center>
      <Title>Best Selling Products</Title>
      <StyledProductsGrid>
        {products?.length > 0 &&
          products.map((product) => (
            <ProductBlock key={product._id}>
              <ProductImage>
                <img src={product.images?.[0]} alt="" />
              </ProductImage>
              <div>
                <ProductTitle>{product.name}</ProductTitle>
                <Price>{product.price?.toLocaleString()}đ</Price>
                <Rating value={4} />
              </div>
            </ProductBlock>
          ))}
      </StyledProductsGrid>
    </Center>
  )
}
