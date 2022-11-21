import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface User {
  id: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8888/' }),
  endpoints: (builder) => ({
    signUser: builder.mutation({
      query: () => 'user'
    }),
  }),
})

export const { useSignUserMutation } = authApi