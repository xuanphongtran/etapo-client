import styled, { css } from 'styled-components'

const PaginationWrapper = styled.ul`
  display: flex;
  justify-content: start;
  list-style: none;
  flex-wrap: wrap;
  padding: 0;
  margin: 45px 0 5px;
`
const PaginationNumber = styled.li`
  height: 40px;
  width: 40px;
  display: inline-block;
  text-align: center;
  line-height: 40px;
  margin-right: 10px;
  border-radius: 4px;
  border: 1px solid #e5e5e5;
  ${(props) =>
    props.$active &&
    css`
      background-color: #666;
      color: #ffffff;
    `}
  &:hover {
    background-color: #666;
    color: #ffffff;
  }
  svg {
    height: 14px;
  }
`
const Pagination = ({ total, pageSize, page, setPage }) => {
  const generatePagination = (total, itemsPerPage, currentPage, setPage) => {
    const pageCount = Math.ceil(total / itemsPerPage)
    const pagesToShow = []
    // Always show previous page button
    const prev = () => {
      if (currentPage > 0) {
        setPage(currentPage - 1)
      }
    }
    pagesToShow.push(
      <PaginationNumber key="prev" onClick={prev}>
        {'<'}
      </PaginationNumber>,
    )
    if (pageCount <= 5) {
      // Simple case when there are 5 or fewer pages
      for (let i = 1; i <= pageCount; i++) {
        pagesToShow.push(
          <PaginationNumber key={i} $active={i - 1 === currentPage} onClick={() => setPage(i - 1)}>
            {i}
          </PaginationNumber>,
        )
      }
    } else {
      // Complex case when there are more than 5 pages
      const showEllipsisPrev = currentPage > 3
      const showEllipsisNext = currentPage < pageCount - 2
      if (showEllipsisPrev) {
        pagesToShow.push(<PaginationNumber key="ellipsis-prev">{'...'}</PaginationNumber>)
      }
      for (let i = Math.max(1, currentPage - 2); i <= Math.min(pageCount, currentPage + 2); i++) {
        pagesToShow.push(
          <PaginationNumber key={i} $active={i - 1 === currentPage} onClick={() => setPage(i - 1)}>
            {i}
          </PaginationNumber>,
        )
      }
      if (showEllipsisNext) {
        pagesToShow.push(<PaginationNumber key="ellipsis-next">{'...'}</PaginationNumber>)
      }
    }
    // Always show next page button
    const next = () => {
      if (currentPage + 1 < pageCount) {
        setPage(currentPage + 1)
      }
    }
    pagesToShow.push(
      <PaginationNumber key="next" onClick={next}>
        {'>'}
      </PaginationNumber>,
    )
    return pagesToShow
  }
  return (
    <>
      <PaginationWrapper>{generatePagination(total, pageSize, page, setPage)}</PaginationWrapper>
    </>
  )
}

export default Pagination
