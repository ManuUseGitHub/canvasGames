import { createSlice } from '@reduxjs/toolkit'
import { Point, GostPoint } from '../../../resources/types'
import { clickedHandled } from '../actions/clicked'
import { dragHandled } from '../actions/drag'
import { pusHandled } from '../actions/push'
import { releaseHandled } from '../actions/release'
import { relocateHandled } from '../actions/relocate'
import { moveHandled } from '../actions/move'
import { stopHandled } from '../actions/stop'
import { enterHandled } from '../actions/enter'
import { leaveHandled } from '../actions/leave'

type InitialState = {
  coords: Point,
  pointClicked: GostPoint,
  from: GostPoint,
  to: GostPoint,
  down: boolean,
  dragging: boolean,
  dragged: boolean,
  isMoving: boolean,
  inCanvas: boolean
}
const initialState: InitialState = {
  coords: { x: 0, y: 0 },
  pointClicked: { x: undefined, y: undefined },
  from: { x: undefined, y: undefined },
  to: { x: undefined, y: undefined },
  down: false,
  dragging: false,
  dragged: false,
  isMoving: false,
  inCanvas: true,
}

const pointerSlice = createSlice({
  name: 'point',
  initialState,
  reducers: {
    relocate: (state, action) => relocateHandled(state, action),
    push: (state) => pusHandled(state),
    release: (state) => releaseHandled(state),
    drag: (state) => dragHandled(state),
    clicked: (state) => clickedHandled(state),
    move: (state) => moveHandled(state),
    stop: (state) => stopHandled(state),
    enter: (state) => enterHandled(state),
    leave: (state) => leaveHandled(state),
  }
})

export default pointerSlice.reducer
export const { relocate, push, clicked, release, drag, move, stop, enter, leave } = pointerSlice.actions

