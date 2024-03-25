import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

const store = configureStore({
  reducer: combineReducers({}),
  devTools: true,
})

export const makeStore = () => store

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true })
