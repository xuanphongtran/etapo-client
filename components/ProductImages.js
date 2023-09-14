import styled from 'styled-components'
import { useState } from 'react'

const BigImageWrapper = styled.div`
  text-align: center;
  border: 1px dashed #e5e5e5;
  border-radius: 10px;
  width: 630px;
`

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`
const BigImage = styled.img`
  max-width: 100%;
  max-height: 400px;
`
const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`
const ImageButton = styled.div`
  border: 1px dashed;
  ${(props) =>
    props.active
      ? `
      border-color: #ff782c;
    `
      : `
      border-color: #e5e5e5;
    `}
  height: 40px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
`

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0])
  return (
    <div>
      <BigImageWrapper>
        <BigImage src={activeImage} />
      </BigImageWrapper>
      <ImageButtons>
        {images.map((image) => (
          <ImageButton
            key={image}
            active={image === activeImage}
            onClick={() => setActiveImage(image)}
          >
            <Image src={image} alt="" />
          </ImageButton>
        ))}
      </ImageButtons>
    </div>
  )
}
