import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export interface User {
  id: string;
  password: string;
}
const initialState: User = {
  id:'', 
  password: ''
}

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state = initialState
    }

  }
})

export const addUserAsync = createAsyncThunk('ADD_USER', async(user: User) => {
  const response = await axios.post('http://localhost:8888/user', user)
  return response.data;
})

export const {  logout } = authSlice.actions;
export default authSlice.reducer