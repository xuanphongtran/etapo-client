import styled from 'styled-components'
import { SearchIcon } from './icons/Icon'
import { useState } from 'react'
import Link from 'next/link'

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

const SearchButton = styled(Link)`
  background-color: #6839cc;
  border: none;
  color: #ffffff;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  align-items: center;
  display: flex;
  justify-content: center;
  &:hover {
    background-color: #ff782c;
  }
  svg {
    height: 20px;
  }
`

const SearchBar = () => {
  const [search, setSearch] = useState('')
  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        placeholder="Tìm kiếm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <SearchButton href={{ pathname: '/categories', query: { search: `${search}` } }}>
        <SearchIcon />
      </SearchButton>
    </SearchBarContainer>
  )
}

export default SearchBar
