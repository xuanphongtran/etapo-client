import { HTTP_CODES } from '@/constants/constants'
import AXIOS from '@/lib/axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (params, { rejectWithValue }) => {
    const response = await AXIOS.get('/products', { params: params })
    if (response.status === HTTP_CODES.OK) {
      return response.data.result
    }
    return rejectWithValue(response.data)
  },
)
