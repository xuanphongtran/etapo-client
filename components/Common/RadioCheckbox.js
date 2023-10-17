import { useState } from 'react'
import styled from 'styled-components'
import { MoneyIcon, VnpayIcon } from '../icons/Icon'

const Wrapper = styled.div`
  height: auto;
  padding: 0px 16px 24px 16px;
`

const Item = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  padding: 15px 20px;
  border: 1px solid ${(props) => (props.$isSelected ? '#ff782c' : '#e5e5e5')};
  border-radius: 16px;
  box-sizing: border-box;
  margin-bottom: 10px;
  color: ${(props) => (props.$isSelected ? '#000000' : '#999999')};
  svg {
    height: 30px;
    margin: 0 5px;
  }
`
const Button = styled.input`
  z-index: 1;
  cursor: pointer;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  accent-color: ${(props) => (props.$isSelected ? '#000000' : '#999999')};
`
const RadioButton = ({ isSelected, onSelectChange }) => {
  return (
    <Wrapper>
      <Item $isSelected={isSelected === false}>
        <Button
          type="radio"
          name="radio"
          $isSelected={isSelected === false}
          onChange={() => onSelectChange(false)}
        />
        <MoneyIcon />
        <div>COD (Thanh toán khi nhận hàng)</div>
      </Item>
      <Item $isSelected={isSelected === true}>
        <Button
          type="radio"
          name="radio"
          $isSelected={isSelected === true}
          onChange={() => onSelectChange(true)}
        />
        <VnpayIcon />
        <div>VNPay (Thẻ ATM /Thẻ tín dụng /Thẻ ghi nợ)</div>
      </Item>
    </Wrapper>
  )
}

export default RadioButton
