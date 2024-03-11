import { createSlice } from '@reduxjs/toolkit'
import { zoomInHandled } from '../actions/zoomIn'
import { zoomOutHandled } from '../actions/zoomOut'

type InitialState = {
  value: number
}
const initialState: InitialState = {
  value: 0
}

const zoomSlice = createSlice({
  name: 'zoom',
  initialState,
  reducers: {
    zoomIn: (state) => zoomInHandled(state),
    zoomOut: (state) => zoomOutHandled(state)
  }
})

export default zoomSlice.reducer
export const { zoomIn, zoomOut } = zoomSlice.actions
