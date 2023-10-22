import styled from 'styled-components'
import Center from '@/components/Common/Center'
import { ProductBlock } from '@/components/Common/ProductBlock'

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
  padding: 30px 30px 15px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`
export default function MaybeULike({ products }) {
  return (
    <Center>
      <Title>Có thể bạn sẽ thích</Title>
      <StyledProductsGrid>
        {products?.length > 0 && (
          <>
            {products.map((product, index) => (
              <ProductBlock product={product} key={index} />
            ))}
          </>
        )}
      </StyledProductsGrid>
    </Center>
  )
}
