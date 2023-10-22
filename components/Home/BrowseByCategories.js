import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import { ElementorShapeTop } from '../icons/ElementorShape'

const Container = styled.div`
  & > svg {
    background-color: #f2eaea;
    color: #ffffff;
    transform: rotate(180deg);
  }
`
const Wrapper = styled.div`
  & > svg {
    color: #ffffff;
  }
  padding-bottom: 80px;
  background-color: #f2eaea;
`
const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px 100px;
  font-weight: normal;
`
const StyledProductsGrid = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 100px;
  border-radius: 4px;
  padding: 30px 30px 27px;
`
const ProductBlock = styled.div`
  width: 227px;
  height: 194.8px;
`
const ProductImage = styled.div`
  background-color: #ffffff;
  border-radius: 50%;
  height: 150px;
  width: 150px;
  overflow: hidden;
  &:hover {
    border: 1px dashed #ff782c;
    transform: rotate(360deg);
    transition: transform 0.5s;
  }
  img {
    display: block;
    margin: 0 auto;
  }
`
const ProductTitle = styled.div`
  margin-top: 15px;
  width: 150px;
  display: flex;
  justify-content: center;
`
const TitleLink = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  font-weight: 700;
  &:hover {
    color: #ff782c !important;
  }
  &:visited {
    color: #000000;
  }
`

export default function BrowseByCategories({ categories }) {
  return (
    <Container>
      <Wrapper>
        <ElementorShapeTop />
        <Title>Tìm theo danh mục</Title>
        <StyledProductsGrid>
          {categories?.length > 0 &&
            categories.map((cat) => (
              <ProductBlock key={cat._id}>
                <Link
                  href={{
                    pathname: '/categories',
                    query: { category: `${cat?._id}` },
                  }}
                >
                  <ProductImage>
                    <Image src={cat?.image} width={140} height={140} alt="Image" />
                  </ProductImage>
                </Link>
                <ProductTitle>
                  <TitleLink
                    href={{
                      pathname: '/categories',
                      query: { category: `${cat?._id}` },
                    }}
                  >
                    {cat.name}
                  </TitleLink>
                </ProductTitle>
              </ProductBlock>
            ))}
        </StyledProductsGrid>
      </Wrapper>
      <ElementorShapeTop />
    </Container>
  )
}
