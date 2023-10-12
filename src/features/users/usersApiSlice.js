import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://localhost:7191/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const userApiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (userData) => ({
        url: '/User/AddUser',
        method: 'POST',
        body: userData,
      }),
    }),
    editUser: builder.mutation({
      query: ({ id, name, email }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: { name, email },
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/User/${id}`,
        method: 'DELETE',
      }),
    }),
    getUsersList: builder.query({
      query: () => '/User/GetUsers', 
    }),
  }),
});


export const {
  useAddUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
  useGetUsersListQuery,
} = userApiSlice;

export default userApiSlice;
