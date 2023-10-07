import styled from 'styled-components'
import { useContext, useState } from 'react'
import { CartContext } from '@/components/CartContext'
import css from 'styled-jsx/css'
import { RightIcon } from './icons/Icon'

const Container = styled.div`
  color: #fff;
  background-color: ${(props) => props.$backgroud || 'transparent'};
  height: 750px;
  svg {
    height: 400px;
  }
`
const ImageContainer = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const NavButton = styled.button`
  width: 60px;
  height: 60px;
  outline: none;
  background: white;
  border: none;
  cursor: pointer;
  padding: 0;
  position: absolute;
  top: 50%;
  border-radius: 50%;
  color: black;
  transform: translate(0, -50%);
  svg {
    height: 16px;
  }
  &:hover {
    background-color: #6839cc;
    color: #ffffff;
  }
  ${(props) =>
    props.$right
      ? css`
          right: 2%;
        `
      : css`
          left: 2%;
          svg {
            transform: rotate(180deg);
          }
        `}
`
const config = [
  {
    title: '1',
    background: '#e1f5ff',
  },
  {
    title: '2',
    background: '#f6e2e4',
  },
  {
    title: '3',
    background: '#e9e9e9',
  },
]
export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext)
  const [imageIndex, setImageIndex] = useState(0)
  const addFeaturedToCart = () => {
    addProduct(product._id)
  }
  const next = () => {
    setImageIndex((state) => (state += 1))
    if (imageIndex === config.length - 1) setImageIndex(0)
  }
  const prev = () => {
    setImageIndex((state) => (state -= 1))
    if (imageIndex === 0) setImageIndex(config.length - 1)
  }
  return (
    <Container $backgroud={config[imageIndex].background}>
      {/* <ImageContainer src={config[imageIndex].image} /> */}
      <NavButton onClick={prev}>
        <RightIcon />
      </NavButton>
      <NavButton $right onClick={next}>
        <RightIcon />
      </NavButton>
    </Container>
  )
}
const Home1 = () => {
  return <div></div>
}
const Home2 = () => {
  return <div></div>
}
const Home3 = () => {
  return <div></div>
}
