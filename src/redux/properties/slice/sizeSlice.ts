import { createSlice } from '@reduxjs/toolkit'
import { redimensionHandled } from '../actions/redimension'


type InitialState = {
  width?: number,
  height?: number
}
const initialState: InitialState = {
  width: undefined,
  height: undefined
}

const sizePropSlice = createSlice({
  name: 'sizeProp',
  initialState,
  reducers: {
    redimension: (state, action) => redimensionHandled(state, action)
  }
})

export default sizePropSlice.reducer
export const { redimension } = sizePropSlice.actions
