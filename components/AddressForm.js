import styled, { css } from 'styled-components'
import Button from './Common/Button'
import { useForm } from 'react-hook-form'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import axios from 'axios'

export const Title = styled.h3`
  font-weight: 600;
  font-size: 32px;
  margin: 0 0 15px;
`
export const Label = styled.label`
  ${(props) =>
    props.$required &&
    css`
      &::after {
        content: '*';
        margin-left: 3px;
        color: red;
      }
    `}
`
export const Input = styled.input`
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
export const Select = styled.select`
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
export const Form = styled.form`
  width: ${(props) => props.$width || '80%'};
`
const AddressForm = forwardRef(({ width, info, isCheckout }, ref) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

  const onSubmit = (data) => {
    console.log(data)
  }

  useImperativeHandle(ref, () => ({
    getData,
  }))

  const getData = () => {
    // Return the data you want to pass to the parent
    return {
      name: getValues('name'),
      companyName: getValues('companyName'),
      province: getValues('province'),
      district: getValues('district'),
      ward: getValues('ward'),
      address: getValues('address'),
      phoneNumber: getValues('phoneNumber'),
      email: getValues('email'),
    }
  }

  const fetchDistricts = async (provinceCode) => {
    try {
      const response = await axios.get(
        `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`,
      )
      setDistricts(response.data.districts)
    } catch (error) {
      console.error('Error fetching districts:', error)
    }
  }

  const fetchWards = async (districtCode) => {
    try {
      const response = await axios.get(
        `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`,
      )
      setWards(response.data.wards)
    } catch (error) {
      console.error('Error fetching wards:', error)
    }
  }

  const onProvinceChange = (event) => {
    fetchDistricts(event.target.value)
  }

  const onDistrictChange = (event) => {
    fetchWards(event.target.value)
  }

  useEffect(() => {
    axios.get('https://provinces.open-api.vn/api/').then((response) => {
      setProvinces(response.data)
    })
    if (info) {
      fetchDistricts(info.province)
      fetchWards(info.district)
      setValue('name', info.name)
      setValue('companyName', info?.companyName)
      setValue('province', info?.province)
      setValue('district', info?.district)
      setValue('ward', info?.ward)
      setValue('address', info?.address)
      setValue('phoneNumber', info?.phoneNumber)
      setValue('email', info?.email)
    }
  }, [info, setValue])

  return (
    <div>
      <Title>Chi tiết tài khoản</Title>
      <Form $width={width} onSubmit={handleSubmit(onSubmit)}>
        <Label $required>Họ và tên</Label>
        <Input type="text" placeholder="Họ và tên" {...register('name', { required: true })} />
        <Label>Tên công ty (Nếu có)</Label>
        <Input type="text" placeholder="Tên công ty" {...register('companyName')} />
        <Label $required>Tỉnh thành phố</Label>
        <Select {...register('province', { required: true })} onChange={onProvinceChange}>
          <option value="" disabled selected>
            Chọn tỉnh/thành phố
          </option>
          {provinces.map((a) => (
            <option key={a.code} value={a.code}>
              {a.name}
            </option>
          ))}
        </Select>
        <Label $required>Quận/huyện</Label>
        <Select {...register('district', { required: true })} onChange={onDistrictChange}>
          <option value="" disabled selected>
            Chọn quận/huyện
          </option>
          {districts.map((a) => (
            <option key={a.code} value={a.code}>
              {a.name}
            </option>
          ))}
        </Select>
        <Label $required>Phường/xã</Label>
        <Select {...register('ward', { required: true })}>
          <option value="" disabled selected>
            Chọn phường/xã
          </option>
          {wards.map((a) => (
            <option key={a.code} value={a.code}>
              {a.name}
            </option>
          ))}
        </Select>
        <Label $required>Địa chỉ</Label>
        <Input type="text" placeholder="Địa chỉ" {...register('address', { required: true })} />
        <Label $required>Số điện thoại</Label>
        <Input
          type="number"
          placeholder="Số điện thoại"
          {...register('phoneNumber', { required: true })}
        />
        <Label $required>Email</Label>
        <Input
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          type="email"
          placeholder="Email"
          required
          readOnly={info?.email ? true : false}
        />
        {!isCheckout && (
          <Button $orange $hover="#000000" type="submit">
            Lưu địa chỉ
          </Button>
        )}
      </Form>
    </div>
  )
})

AddressForm.displayName = 'AddressForm'
export default AddressForm
