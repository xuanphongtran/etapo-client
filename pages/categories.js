import { Banner } from '@/components/Banner'
import Button from '@/components/Common/Button'
import { Footer } from '@/components/Common/Footer'
import Header from '@/components/Common/Header'
import styled from 'styled-components'
const CategoriesContainer = styled.div`
  border-top: 1px dashed black;
  margin-top: 84px;
  height: 100px;
`
const categories = () => {
  const handleClick = () => {
    console.log('dm')
  }
  return (
    <>
      <Header />
      <CategoriesContainer>
        <Banner columne={2} />
        <Button onClick={handleClick}>aaaaaaaaaaaaaaaaa</Button>
      </CategoriesContainer>
      <Footer />
    </>
  )
}

export default categories
