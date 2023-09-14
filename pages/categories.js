import { Banner } from '@/components/Banner'
import { Footer } from '@/components/Common/Footer'
import Header from '@/components/Common/Header'
import styled from 'styled-components'
const CategoriesContainer = styled.div`
  border-top: 1px dashed black;
  margin-top: 84px;
  height: 100px;
`
const categories = () => {
  return (
    <>
      <Header />
      <CategoriesContainer>
        <Banner columne={2} />
      </CategoriesContainer>
      <Footer />
    </>
  )
}

export default categories
