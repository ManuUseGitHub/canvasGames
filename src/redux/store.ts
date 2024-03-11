import { configureStore } from '@reduxjs/toolkit'
import pointerReducer from './pointer/slice/pointerSlice'
import zoomReducer from './zoom/slice/zoomSlice'
import sizePropReducer from './properties/slice/sizeSlice'

const store = configureStore({
  reducer: {
    sizeProp: sizePropReducer,
    zoom: zoomReducer,
    point: pointerReducer
  }
})

export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
