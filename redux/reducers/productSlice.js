import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
})
export const productSliceState = (state) => state.admission
export default productSlice.reducer
