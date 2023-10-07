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
  const ItemValue = [
    { label: 'Tài khoản của tôi', value: 'dashboard', tab: 1 },
    { label: 'Đơn hàng', value: 'orders', tab: 2 },
    { label: 'Tải xuống', value: 'dowloads', tab: 3 },
    { label: 'Chỉnh sửa địa chỉ', value: 'addresses', tab: 3 },
    { label: 'Chi tiết tài khoản', value: 'accountdetails', tab: 4 },
  ]
  return (
    <AccountContainer>
      <AccountDashboard>
        {ItemValue.map((item, index) => (
          <Item key={index}>
            <ItemLink href={{ pathname: '/account', query: { tab: `${item.tab}` } }}>
              {item.label}
            </ItemLink>
          </Item>
        ))}

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
