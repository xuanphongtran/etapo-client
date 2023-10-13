import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ArrowUpIcon } from './icons/Icon'
import styled from 'styled-components'

const Wrapper = styled(Link)`
  display: ${(props) => (props.$showbutton ? 'inline-flex' : 'none')};
  position: fixed;
  bottom: 24px;
  right: 24px;
  background-color: #000;
  color: #ffffff;
  padding: 12px;
  border-radius: 50%;
  font-size: 15px;
  box-shadow: 0 4px 12px hsla(228, 15%, 8%, 0.4);
  z-index: 99999;
  svg {
    height: 20px;
  }
`
const ScrollUp = () => {
  const [showButton, setShowButton] = useState(false)

  const handleScroll = () => {
    if (window.scrollY >= 350) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <Wrapper href="#" $showbutton={showButton} onClick={scrollToTop}>
      <ArrowUpIcon />
    </Wrapper>
  )
}
export default ScrollUp
