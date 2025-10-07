import { configureStore } from '@reduxjs/toolkit'
import books from './slices/booksSlice'
import users from './slices/usersSlice'
import filter from './slices/filterSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    books,
    users,
    filter,
  },
})

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
