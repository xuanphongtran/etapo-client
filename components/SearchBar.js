import styled from 'styled-components'

const SearchWrapper = styled.div`
  width: 300px;
`
const SearchInput = styled.input`
  border: none;
  padding: 6px;
  width: 100%;
  border-radius: 4px;
  margin-right: 8px;
`

// const SearchButton = styled.button`
//   background-color: #f28102;
//   color: #1d273e;
//   border: none;
//   padding: 8px 16px;
//   border-radius: 4px;
//   cursor: pointer;
// `

const Searchbar = () => {
  return (
    <SearchWrapper>
      <SearchInput type="text" placeholder="Search" />
      {/* <SearchButton>Search</SearchButton> */}
    </SearchWrapper>
  )
}

export default Searchbar
