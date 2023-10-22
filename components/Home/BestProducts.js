import styled from 'styled-components'
import Center from '@/components/Common/Center'
import Rating from '../Rating'
import Link from 'next/link'
import Image from 'next/image'

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`
const StyledProductsGrid = styled.div`
  display: grid;
  gap: 20px;
  border-radius: 4px;
  border: 1px dashed #e5e5e5;
  padding: 30px 30px 27px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`
const ProductBlock = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`
const ProductImage = styled(Link)`
  max-width: 80px;
  min-width: 80px;
  margin-right: 15px;
  img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
`
const ProductTitle = styled(Link)`
  text-decoration: none;
  font-size: 16px;
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
  margin: 8px 0;
`

export default function BestProducts({ products }) {
  return (
    <Center>
      <Title>Sản phẩm bán chạy</Title>
      <StyledProductsGrid>
        {products?.length > 0 &&
          products.map((product) => (
            <ProductBlock key={product._id}>
              <ProductImage href={'/product/' + product._id}>
                <Image src={product.images?.[0]} width={80} height={80} alt="Image" />
              </ProductImage>
              <div>
                <ProductTitle href={'/product/' + product._id}>{product.name}</ProductTitle>
                <Price>
                  {product?.discount
                    ? (
                        (Number(product.price.replace(/,/g, '')) * (100 - product.discount)) /
                        100
                      ).toLocaleString()
                    : product.price.toLocaleString()}
                  đ
                </Price>
                <Rating
                  value={product?.averageStarPoint}
                  reviewCount={product?.reviewCount}
                  size="14px"
                />
              </div>
            </ProductBlock>
          ))}
      </StyledProductsGrid>
    </Center>
  )
}
