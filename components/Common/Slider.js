// Slider.js
import React, { useState } from 'react'
import styled from 'styled-components'

const SliderContainer = styled.div`
  width: 300px;
  margin: 20px;
`

const RangeInput = styled.input`
  width: 100%;
  margin-top: 10px;
`

const Slider = () => {
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(100)

  const handleMinChange = (e) => {
    setMinValue(parseInt(e.target.value))
  }

  const handleMaxChange = (e) => {
    setMaxValue(parseInt(e.target.value))
  }

  return (
    <SliderContainer>
      <label>Min:</label>
      <RangeInput type="range" min={0} max={maxValue} value={minValue} onChange={handleMinChange} />
      <label>Max:</label>
      <RangeInput
        type="range"
        min={minValue}
        max={100}
        value={maxValue}
        onChange={handleMaxChange}
      />
      <p>Min: {minValue}</p>
      <p>Max: {maxValue}</p>
    </SliderContainer>
  )
}

export default Slider
