import styled from 'styled-components'
import Center from '@/components/Center'
import ProductBox from './ProductBox'

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`
const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`

export default function BestProducts({ products }) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <StyledProductsGrid>
        {products?.length > 0 &&
          products.map((product) => <ProductBox key={product._id} {...product} />)}
      </StyledProductsGrid>
    </Center>
  )
}
