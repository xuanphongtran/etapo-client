import AXIOS from '@/lib/axios'
import React, { useState } from 'react'
import styled from 'styled-components'
import { NavLink } from './NavLink'
import Button from './Button'

const LoginContainer = styled.div`
  text-align: left;
  right: 160px;
  top: 100%;
  position: absolute;
  margin-top: 15px;
  background-color: #fff;
  z-index: 99999;
  width: 300px;
  border: 1px solid #e5e5e5;
  border-top: 2.5px solid #ff782c;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.05);
  padding: 20px;
`
const LoginHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`
const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  line-height: 17px;
`
const LoginForm = styled.form`
  width: 100%;
  display: block;
`
const Error = styled.div`
  margin: 14px 0;
  padding: 20px;
  color: #ffffff;
  border-radius: 2px;
  border-left: 10px solid rgba(0, 0, 0, 0.15);
  background-color: #e2401c;
`
const Label = styled.label`
  color: #666666;
  &::after {
    content: '*';
    margin-left: 3px;
    color: red;
  }
`

const Input = styled.input`
  width: -webkit-fill-available;
  padding: 15px;
  color: #666666;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  margin: 8px 0 16px;
  font-size: 16px;
  &:focus {
    outline: 1px solid #6839cc;
  }
`
const LoginFooter = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 10px;
`

const Login = ({ setLoginActive }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await AXIOS.post('/auth/login', { email, password })
      if (response) {
        const { accessToken, refreshToken } = response.data
        // Lưu token vào localStorage hoặc sessionStorage
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        // Chuyển hướng hoặc cập nhật UI
        // Refresh the entire page
        window.location.reload()
      } else {
        // Xử lý lỗi đăng nhập
        setError(true)
        console.error(data.message)
      }
    } catch (error) {
      setError(true)
      console.error('Lỗi kết nối:', error.message)
    }
  }
  return (
    <LoginContainer>
      <LoginHeader>
        <Title>Đăng nhập</Title>
        <NavLink href={'/account'} $color="#999999">
          Đăng ký tài khoản
        </NavLink>
      </LoginHeader>
      <LoginForm onSubmit={handleSubmit}>
        {error && <Error>Email hoặc mật khẩu không chính xác. Vui lòng thử lại</Error>}
        <Label htmlFor="email">Email</Label>
        <Input
          type="text"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Label htmlFor="password">Mật khẩu</Label>
        <Input
          type="password"
          id="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button $orange $width="100%">
          Đăng nhập
        </Button>
      </LoginForm>
      <LoginFooter>
        <NavLink href={'/account'} $color="#999999">
          Quên mật khẩu ?
        </NavLink>
      </LoginFooter>
    </LoginContainer>
  )
}
export default Login
