import styled from 'styled-components'
import Button from './Common/Button'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Input, Label, Title } from './AddressForm'
import AXIOS from '@/lib/axios'

const Form = styled.form`
  width: ${(props) => props.$width || '80%'};
`

const Error = styled.div`
  margin: 14px 0;
  padding: 20px;
  color: #ffffff;
  border-radius: 2px;
  border-left: 10px solid rgba(0, 0, 0, 0.15);
  background-color: #e2401c;
`
const RegisterForm = ({ width }) => {
  const [error, setError] = useState()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const response = await AXIOS.post('/auth/register', data)
      if (response) {
        setError(error?.response.data)
        window.alert('Đăng ký thành công')
        reset()
      } else {
        setError(response?.data)
      }
    } catch (error) {
      setError(error.response?.data)
      console.log(error)
    }
  }

  return (
    <div>
      <Title>Đăng ký tài khoản</Title>
      {error && <Error>{error}</Error>}
      <Form $width={width} onSubmit={handleSubmit(onSubmit)}>
        <Label $required>Họ và tên</Label>
        <Input type="text" placeholder="Họ và tên" {...register('fullName', { required: true })} />
        <Label $required>Email</Label>
        <Input
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          type="email"
          placeholder="Email"
          required
        />
        <Label $required>Số điện thoại</Label>
        <Input
          type="number"
          placeholder="Số điện thoại"
          {...register('phoneNumber', { required: true })}
        />
        <Label $required>Mật khẩu</Label>
        <Input
          type="password"
          placeholder="Mật khẩu"
          {...register('password', { required: true })}
        />
        <Label $required>Nhập lại mật khẩu</Label>
        <Input
          type="password"
          placeholder="Nhập lại mật khẩu"
          {...register('passwordAgain', { required: true })}
        />
        <Button $orange $hover="#000000" type="submit" $padding="15px 75px">
          Đăng ký
        </Button>
      </Form>
    </div>
  )
}

export default RegisterForm
