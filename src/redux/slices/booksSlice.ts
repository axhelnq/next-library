import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { BookItem } from '@/types/book'

export enum Status {
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success',
}

interface BookSliceState {
  items: BookItem[]
  status: Status
}

const initialState: BookSliceState = {
  items: [],
  status: Status.LOADING,
}

// todo заходуя запитів на сервак
export const fetchData = createAsyncThunk<BookItem[], Record<string, string>>(
  'books/fetchItems',
  async (params) => {
    const { sortBy, order, search, currentPage } = params
    const { data } = await axios.get<BookItem[]>(
      `http://localhost:3001/books?_page=${currentPage}&_limit=4&_sort=${sortBy}&_order=${order}${search}`,
      // `http://localhost:3001/books`,
    )
    return data
  },
)

// export const fetchData = createAsyncThunk<PizzaItem[], Record<string, string>>(
//   'pizzas/fetchItems',
//   async (params) => {
//     const { category, sortBy, order, search, currentPage } = params
//     const { data } = await axios.get<PizzaItem[]>(
//       `http://localhost:3001/items?_page=${currentPage}&_limit=4${category}&_sort=${sortBy}&_order=${order}${search}`,
//     )
//     return data
//   },
// )

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    // setItems(state, action: PayloadAction<PizzaItem[]>) {
    //   state.items = action.payload
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(
      fetchData.fulfilled,
      (state, action: PayloadAction<BookItem[]>) => {
        state.items = action.payload
        state.status = Status.SUCCESS
      },
    )
    builder.addCase(fetchData.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  },
})

// export const { setItems } = pizzasSlice.actions

export default booksSlice.reducer
