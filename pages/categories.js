'use client'
import Head from 'next/head'
import AXIOS from '@/lib/axios'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import ScrollUp from '@/components/ScrollUp'
import Breadcrumb from '@/components/Common/BreakCrumb'
import Dropdown from '@/components/Common/Dropdown'
import Footer from '@/components/Common/Footer'
import Header from '@/components/Common/Header'
import Slider from '@/components/Common/Slider'
import { Banner } from '@/components/Common/Banner'
import { ProductBlock } from '@/components/Common/ProductBlock'
import { ListIcon, PawPrint, RightIcon, SquareIcon } from '@/components/icons/Icon'
import { useRouter } from 'next/router'

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
  color: ${(props) => (props.isSelected ? '#ff782c' : '#666666')};
  fill: ${(props) => (props.isSelected ? '#ff782c' : '#666666')};
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
  /* justify-content: space-between; */
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
const breadcrumbItems = [
  { label: 'Trang chủ', url: '/' },
  { label: 'Category', url: '/categories' },
]
const Categories = ({ brands, categories }) => {
  const [products, setProducts] = useState()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(12)
  const [sort, setSort] = useState({})
  const [search, setSearch] = useState('')
  const [total, setTotal] = useState(0)
  const [category, setCategory] = useState()
  const [brand, setBrand] = useState()
  const router = useRouter()
  const options = [
    'Defaul sorting',
    'Sort by popularity',
    'Sort by average rating',
    'Sort by lastest',
    'Sort by price: low to hight',
    'Sort by price: hight to low',
  ]
  useEffect(() => {
    setSearch(router.query.search)
  }, [router])

  useEffect(() => {
    AXIOS.get('/product', {
      params: { page, pageSize, sort: JSON.stringify(sort), search, category, brand },
    }).then((response) => {
      setProducts(response.data?.productWithStats)
      setTotal(response.data?.total)
    })
  }, [page, pageSize, sort, search, category, brand])

  return (
    <>
      <Head>
        <title>Danh sách sản phẩm</title>
      </Head>
      <Header />
      <CategoriesContainer>
        <Banner column={2} />
        <Breadcrumb items={breadcrumbItems} />
        <Content>
          {/* Left Column */}
          <div>
            <WidgetTitle>Lọc theo danh mục</WidgetTitle>
            <WidgetContent>
              <WidgetUl>
                {categories?.map((cat) => (
                  <Item
                    key={cat._id}
                    onClick={() => setCategory(cat._id)}
                    isSelected={category === cat._id}
                  >
                    <ItemLink href="#">
                      <PawPrint />
                      {cat.name}
                    </ItemLink>
                    <div>({cat.productCount})</div>
                  </Item>
                ))}
              </WidgetUl>
            </WidgetContent>
            <WidgetTitle>Lọc theo giá thành</WidgetTitle>
            <WidgetContent>
              <Slider />
            </WidgetContent>
            <WidgetTitle>Lọc theo thương hiệu</WidgetTitle>
            <WidgetContent>
              <WidgetUl>
                {brands?.map((cat) => (
                  <Item
                    key={cat._id}
                    isSelected={brand === cat._id}
                    onClick={() => setBrand(cat._id)}
                  >
                    <ItemLink href="">
                      <PawPrint />
                      {cat.name}
                    </ItemLink>
                    <div>({cat.productCount})</div>
                  </Item>
                ))}
              </WidgetUl>
            </WidgetContent>
            <WidgetTitle>Sản phẩm bán chạy</WidgetTitle>
            {/* <WidgetTitle>Filter By Tags</WidgetTitle> */}
          </div>
          {/* Right Column */}
          <RightCol>
            <Sorting>
              <SquareIcon $active />
              <ListIcon />
              <Dropdown options={options} />
              <ResultCount>Tổng cộng {total} kết quả</ResultCount>
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

export async function getServerSideProps() {
  const categories = await AXIOS.get(`/client/categories`, { params: { level: 2 } }).then(
    (response) => response.data,
  )
  const brands = await AXIOS.get(`/client/brands`).then((response) => response.data)
  return {
    props: {
      categories,
      brands,
    },
  }
}
