import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { UserItem } from '@/types/user'

export enum Status {
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success',
}

interface UserSliceState {
  items: UserItem[]
  status: Status
  item: UserItem
}

const initialState: UserSliceState = {
  items: [],
  status: Status.LOADING,
  item: {
    id: '',
    name: '',
    email: '',
    role: 'user',
    password: '',
  },
}

export const fetchUsers = createAsyncThunk<UserItem[], Record<string, string>>(
  'users/fetchUsers',
  async (params) => {
    // const { category, sortBy, order, search, currentPage } = params
    const { data } = await axios.get<UserItem[]>(
      // `http://localhost:3001/items?_page=${currentPage}&_limit=4${category}&_sort=${sortBy}&_order=${order}${search}`,
      `http://localhost:3001/users`,
    )
    return data
  },
)

export const fetchUserById = createAsyncThunk<UserItem[], string>(
  'users/fetchUserById',
  async (id) => {
    const { data } = await axios.get<UserItem[]>(
      `http://localhost:3001/users?id=${id}`,
    )
    return data
  },
)

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // setItems(state, action: PayloadAction<PizzaItem[]>) {
    //   state.items = action.payload
    // },
  },
  extraReducers: (builder) => {
    // fetchUsers
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<UserItem[]>) => {
        state.items = action.payload
        state.status = Status.SUCCESS
      },
    )
    builder.addCase(fetchUsers.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
    // fetchUserById
    builder.addCase(
      fetchUserById.fulfilled,
      (state, action: PayloadAction<UserItem[]>) => {
        state.item = action.payload[0]
        state.status = Status.SUCCESS
      },
    )
  },
})

// export const { setItems } = pizzasSlice.actions

export default usersSlice.reducer
