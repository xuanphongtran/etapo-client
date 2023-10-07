import styled from 'styled-components'

const StyledDiv = styled.div`
  margin: 10px 80px;
  padding: 0 20px;
  background-color: #ffffff;
`

export default function Center({ children }) {
  return <StyledDiv>{children}</StyledDiv>
}
