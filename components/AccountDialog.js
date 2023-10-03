import styled from 'styled-components'
import Link from 'next/link'
import { LogOutIcon } from './icons/Icon'
const AccountContainer = styled.div`
  text-align: left;
  right: 160px;
  top: 100%;
  position: absolute;
  margin-top: 15px;
  background-color: #fff;
  z-index: 99999;
  width: 200px;
  border: 1px solid #e5e5e5;
  border-top: 2.5px solid #ff782c;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.05);
  padding: 15px 0;
`
const AccountDashboard = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`
const ItemLink = styled(Link)`
  text-decoration: none;
  color: #666666;
  display: flex;
  &:visited {
    color: #666666;
  }
  svg {
    height: 16px;
    margin-left: 5px;
  }
  cursor: pointer;
`

const Item = styled.li`
  padding: 7px 30px;
  &:hover {
    background-color: #e5e5e5;
    ${ItemLink} {
      color: #ff782c;
    }
  }
`
const AccountDialog = () => {
  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    window.location.reload()
  }
  return (
    <AccountContainer>
      <AccountDashboard>
        <Item>
          <ItemLink href="/account">Tài khoản của tôi </ItemLink>
        </Item>
        <Item>
          <ItemLink href="">Đơn hàng</ItemLink>
        </Item>
        <Item>
          <ItemLink href="">Tải xuống</ItemLink>
        </Item>
        <Item>
          <ItemLink href="">Chỉnh sửa địa chỉ</ItemLink>
        </Item>
        <Item>
          <ItemLink href="">Chi tiết tài khoản</ItemLink>
        </Item>
        <Item>
          <ItemLink href="" onClick={handleLogout}>
            Đăng xuất <LogOutIcon />
          </ItemLink>
        </Item>
      </AccountDashboard>
    </AccountContainer>
  )
}

export default AccountDialog
