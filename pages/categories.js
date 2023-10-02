'use client'
import { Banner } from '@/components/Common/Banner'
import Breadcrumb from '@/components/Common/BreakCrumb'
import Dropdown from '@/components/Common/Dropdown'
import { Footer } from '@/components/Common/Footer'
import Header from '@/components/Common/Header'
import { ScrollUp } from '@/components/Common/ScrollUp'
import { ProductBlock } from '@/components/ProductBlock'
import { ListIcon, PawPrint, RightIcon, SquareIcon } from '@/components/icons/Icon'
import { AXIOS } from '@/lib/axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const CategoriesContainer = styled.div`
  margin-top: 84px;
  padding: 0 110px;
`
const Content = styled.div`
  margin: 15px 0 40px;
  display: grid;
  grid-template-columns: 0.3fr 1fr;
  gap: 30px;
`
//Left
const WidgetTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 17px;
  margin-bottom: 25px;
  border-bottom: 1px dashed #e5e5e5;
`
const WidgetContent = styled.div`
  margin-bottom: 35px;
`
const WidgetUl = styled.ul`
  list-style-type: none;
  padding: 0;
`
const Item = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  color: #666666;
  fill: #666666;
  &:hover {
    color: #ff782c !important;
    fill: #ff782c;
  }
`
const ItemLink = styled.div`
  display: flex;
  align-items: center;
  line-height: 8px;
  svg {
    height: 20px;
    transform: rotate(45deg);
    margin-right: 15px;
  }
`
//Right
const RightCol = styled.div``
const Sorting = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  svg {
    height: 20px;
    margin-right: 20px;
  }
`
const ResultCount = styled.p`
  color: #666666;
  margin: 0;
  margin-left: auto;
`
const ProductSpacing = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 300px));
  grid-gap: 20px;
  justify-content: space-between;
  margin: 0 auto;
`
const Pagination = styled.ul`
  display: flex;
  justify-content: start;
  list-style: none;
  flex-wrap: wrap;
  padding: 0;
  margin: 45px 0 5px;
`
const PaginationNumber = styled.li`
  height: 40px;
  width: 40px;
  display: inline-block;
  text-align: center;
  line-height: 40px;
  margin-right: 10px;
  border-radius: 4px;
  border: 1px solid #e5e5e5;
  &:hover {
    background-color: #666;
    color: #ffffff;
  }
  svg {
    height: 14px;
  }
`
const Categories = () => {
  const [products, setProducts] = useState()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(12)
  const [sort, setSort] = useState({})
  const [search, setSearch] = useState('')
  const [total, setTotal] = useState(0)

  const breadcrumbItems = [
    { label: 'Trang chủ', url: '/' },
    { label: 'Category', url: '/categories' },
  ]
  const options = [
    'Defaul sorting',
    'Sort by popularity',
    'Sort by average rating',
    'Sort by lastest',
    'Sort by price: low to hight',
    'Sort by price: hight to low',
  ]
  useEffect(() => {
    AXIOS.get('/client/products', {
      params: { page, pageSize, sort: JSON.stringify(sort), search },
    }).then((response) => {
      setProducts(response.data?.productWithStats)
      setTotal(response.data?.total)
    })
  }, [page, pageSize, sort, search])

  return (
    <>
      <Head>
        <title>My page title</title>
      </Head>
      <Header />
      <CategoriesContainer>
        <Banner column={3} />
        <Breadcrumb items={breadcrumbItems} />
        <Content>
          {/* Left Column */}
          <div>
            <WidgetTitle>Product Categories</WidgetTitle>
            <WidgetContent>
              <WidgetUl>
                <Item>
                  <ItemLink href="#">
                    <PawPrint />
                    Uncategorized
                  </ItemLink>
                  <div>(1)</div>
                </Item>
                <Item>
                  <ItemLink href="#">
                    <PawPrint />
                    Uncategorized
                  </ItemLink>
                  <div>(1)</div>
                </Item>
                <Item>
                  <ItemLink href="#">
                    <PawPrint />
                    Uncategorized
                  </ItemLink>
                  <div>(1)</div>
                </Item>
              </WidgetUl>
            </WidgetContent>
            <WidgetTitle>Filter By Price</WidgetTitle>
            <WidgetTitle>Filter By Brands</WidgetTitle>
            <WidgetTitle>Best Seller Products</WidgetTitle>
            <WidgetTitle>Filter By Tags</WidgetTitle>
          </div>
          {/* Right Column */}
          <RightCol>
            <Sorting>
              <SquareIcon $active />
              <ListIcon />
              <Dropdown options={options} />
              <ResultCount>Showing all {total} results</ResultCount>
            </Sorting>
            <ProductSpacing>
              {products?.length > 0 && (
                <>
                  {products.map((product, index) => (
                    <ProductBlock product={product} key={index} />
                  ))}
                </>
              )}
            </ProductSpacing>
            <Pagination>
              <PaginationNumber>1</PaginationNumber>
              <PaginationNumber>2</PaginationNumber>
              <PaginationNumber>3</PaginationNumber>
              <PaginationNumber>
                <RightIcon />
              </PaginationNumber>
            </Pagination>
          </RightCol>
        </Content>
      </CategoriesContainer>
      <Footer />
      <ScrollUp />
    </>
  )
}

export default Categories

// export async function getServerSideProps() {
//   // const id = '64cdb3eed08ed00f3f057af5'
//   // const featuredProduct = await AXIOS.get(`/client/products/${id}`).then(
//   //   (response) => response.data,
//   // )
//   const products = await AXIOS.get(`/client/products`).then((response) => response.data)
//   return {
//     props: {
//       products,
//     },
//   }
// }
