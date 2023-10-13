/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components'
import axios from 'axios'
import Header from '@/components/Common/Header'
import Footer from '@/components/Common/Footer'
import Button from '@/components/Common/Button'
import Breadcrumb from '@/components/Common/BreakCrumb'
import ScrollUp from '@/components/ScrollUp'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '@/components/CartContext'
import { CartIcon, CloseIcon } from '@/components/icons/Icon'
import { NavLink } from '@/components/Common/NavLink'
import { Container, EmptyCart, EmptyCartButton, EmptyCartTitle } from './cart'

const breadcrumbItems = [
  { label: 'Trang chủ', url: '/' },
  { label: 'Danh sách yêu thích', url: '/cart' },
]
const Table = styled.table`
  border-spacing: 0;
  width: 100%;
  border-collapse: collapse;
`
const List = styled.tbody``
const Box = styled.tr`
  display: grid;
  grid-template-columns: 38px 0.4fr 1fr 1fr;
`
const Item = styled.td`
  padding: 10px;
  border: 1px solid;
  border-color: #e5e5e5;
  vertical-align: middle;
  display: flex;
  align-items: center;
  svg {
    height: 16px;
  }
`
const Info = styled(Item)`
  display: block;
`
const InfoName = styled(NavLink)`
  font-size: 20px;
`
const Price = styled.div`
  color: #666666;
  margin-top: 6px;
`

export const TableWishList = () => {
  const { wishlist, removeWishlist, addProduct } = useContext(CartContext)
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (wishlist.length > 0) {
      axios.post('/api/cart', { ids: wishlist }).then((response) => {
        setProducts(response.data)
      })
    } else {
      setProducts([])
    }
    console.log(products)
  }, [wishlist])
  return (
    <>
      {!wishlist?.length && (
        <EmptyCart>
          <CloseIcon />
          <EmptyCartTitle>Danh sách yêu thích của bạn đang trống</EmptyCartTitle>
          <EmptyCartButton $background="#ff782c" $color="#ffffff" $hover="#000000" href={'/'}>
            Trở về trang chủ
          </EmptyCartButton>
        </EmptyCart>
      )}
      <Table>
        <List>
          {wishlist?.length > 0 && (
            <>
              {products.map((item, index) => (
                <Box key={index}>
                  <Item onClick={() => removeWishlist(item._id)}>
                    <CloseIcon />
                  </Item>
                  <Item>
                    <img src={item.images[0]} height="80px" alt="" />
                  </Item>
                  <Info>
                    <InfoName href={`/product/${item._id}`}>{item.name}</InfoName>
                    <Price>{item.price} đ</Price>
                  </Info>
                  <Item>
                    <Button $orange onClick={() => addProduct(item._id, 1)}>
                      <CartIcon />
                      Thêm vào giỏ hàng
                    </Button>
                  </Item>
                </Box>
              ))}
            </>
          )}
        </List>
      </Table>
    </>
  )
}
const WishList = () => {
  return (
    <>
      <Header />
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <TableWishList />
      </Container>
      <Footer />
      <ScrollUp />
    </>
  )
}

export default WishList
