import styled, { css } from 'styled-components'
import Home1 from './Home1'
import Home2 from './Home2'
import Home3 from './Home3'
import { useEffect, useState } from 'react'
import { RightIcon } from '../icons/Icon'

const Container = styled.div`
  color: #fff;
  background-color: ${(props) => props.$backgroud || 'transparent'};
  height: 750px;
  position: relative;
`
const DotContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 3%;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 100;
`
const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
  ${(props) =>
    props.$active === true
      ? css`
          background-color: #ff782c;
        `
      : css`
          background-color: #000000;
        `}
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
    component: <Home1 />,
  },
  {
    title: '2',
    background: '#f6e2e4',
    component: <Home2 />,
  },
  {
    title: '3',
    background: '#e9e9e9',
    component: <Home3 />,
  },
]
export default function Featured({ product }) {
  const [index, setIndex] = useState(0)
  const next = () => {
    setIndex((state) => (state += 1))
    if (index === config.length - 1) setIndex(0)
  }
  const prev = () => {
    setIndex((state) => (state -= 1))
    if (index === 0) setIndex(config.length - 1)
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % config.length)
    }, 5000) // Change this value to adjust the interval (in milliseconds)

    return () => clearInterval(intervalId) // Cleanup the interval on component unmount
  }, [])

  return (
    <>
      <Container $backgroud={config[index].background}>
        {config[index].component}
        <NavButton onClick={prev}>
          <RightIcon />
        </NavButton>
        <NavButton $right onClick={next}>
          <RightIcon />
        </NavButton>
        <DotContainer>
          {config.map((dot, id) => (
            <Dot key={dot.component} $active={id === index} onClick={() => setIndex(id)} />
          ))}
        </DotContainer>
      </Container>
    </>
  )
}
