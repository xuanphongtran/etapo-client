import styled from 'styled-components'
import { SearchIcon } from './icons/Icon'

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 22px;
  background-color: #f5f5f5;
  &:focus-within {
    border: 1px solid #6839cc;
  }
`

const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 220px;
  background-color: #f5f5f5;
`

const SearchButton = styled.button`
  background-color: #6839cc;
  border: none;
  color: #ffffff;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  align-items: center;
  display: flex;
  &:hover {
    background-color: #ff782c;
  }
`

const SearchBar = () => {
  return (
    <SearchBarContainer>
      <SearchInput type="text" placeholder="Search..." />
      <SearchButton>
        <SearchIcon />
      </SearchButton>
    </SearchBarContainer>
  )
}

export default SearchBar
