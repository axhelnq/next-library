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

// удалення книги
export const deleteBook = createAsyncThunk<void, string>(
  'books/deleteBook',
  async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`)
  },
)

// add book
export const createBookAsync = createAsyncThunk(
  'books/addBook',
  async (newBook: Omit<BookItem, 'id' | 'ownerId'>) => {
    const { data } = await axios.post('http://localhost:3001/books', newBook)
    return data
  },
)

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
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
    // видалення книжки
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.items = state.items.filter((book) => book.id !== action.meta.arg)
    })
    builder.addCase(deleteBook.rejected, (state, action) => {
      console.error('Failed to delete book:', action.payload)
    })
  },
})

export default booksSlice.reducer
