import styled, { css } from 'styled-components'

export const ButtonStyle = css`
  border: 0;
  padding: ${(props) => props.$padding || '10px 15px'};
  border-radius: 40px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: ${(props) => props.$fontSize};
  background: ${(props) => props.$background || 'transparent'};
  color: ${(props) => props.$color || '#000000'};
  width: ${(props) => props.$width && props.$width};
  svg {
    height: 16px;
  }
  &:hover {
    background-color: ${(props) => props.$hover || '#ff782c'};
    color: ${(props) => props.$color || '#ffffff'};
  }
  ${(props) =>
    props.$purple &&
    css`
      background-color: #6839cc;
      color: #ffffff;
      svg {
        margin-right: 5px;
      }
    `};
  ${(props) =>
    props.$orange &&
    css`
      background-color: #ff782c;
      color: #ffffff;
      &:hover {
        background-color: #000000;
      }
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
