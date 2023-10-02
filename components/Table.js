import styled from 'styled-components'

const StyledTable = styled.table`
  width: 100%;
  border-top: 1px dashed #e5e5e5;
  border-bottom: 1px dashed #e5e5e5;
  th {
    text-align: left;
    padding: 20px 0;
    text-transform: uppercase;
    color: #000000;
    font-weight: 600;
    font-size: 14px;
  }
  tbody > tr:first-child > td {
    border-top: 1px solid #e5e5e5;
  }
  td {
    border-top: 1px dashed #e5e5e5;
  }
`

export default function Table(props) {
  return <StyledTable {...props} />
}
