import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type SortType = {
  name: string
  // todo окремий тип для sortProperty: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price'
  sortProperty: string
}

interface FilterSliceState {
  searchValue: string
  currentPage: number
  sortType: SortType
}

const initialState: FilterSliceState = {
  searchValue: '',
  currentPage: 1,
  sortType: {
    name: 'назва (DESC)',
    sortProperty: 'title',
  },
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSortType(state, action: PayloadAction<SortType>) {
      state.sortType = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.sortType = action.payload.sortType
      state.currentPage = Number(action.payload.currentPage)
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
  },
})

export const selectFilter = (state: RootState) => state.filter

export const { setSortType, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions

export default filterSlice.reducer
