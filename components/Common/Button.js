import styled, { css } from 'styled-components'
import { primary } from '@/lib/colors'

export const ButtonStyle = css`
  border: 0;
  padding: 10px 15px;
  border-radius: 40px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  background: ${(props) => props.$background || 'transparent'};
  color: ${(props) => props.$color || '#000000'};
  svg {
    height: 16px;
    margin-right: 5px;
  }
  &:hover {
    background-color: ${(props) => props.$hover || '#ff782c'};
  }
  ${(props) =>
    props.primary &&
    css`
      background-color: #6839cc;
      color: #ffffff;
    `};

  ${(props) =>
    props.$decrement &&
    css`
      border-radius: 50px 0 0 50px;
    `};
  ${(props) =>
    props.$increment &&
    css`
      border-radius: 0 50px 50px 0;
    `};
`

const StyledButton = styled.button`
  ${ButtonStyle}
`

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>
}
