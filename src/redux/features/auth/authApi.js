import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/auth',
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({  // mutation is used when we need to send something to the database.
            query: (newUser) => ({
                url: '/register',
                method: 'POST',
                body: newUser
            })
        }),

        verifyEmail: builder.mutation({
            query: (code) => ({
                url: '/verify-email',
                method: 'POST',
                body: { code }
            }),
        }),

        forgotPassword: builder.mutation({
            query: (email) => ({
                url: '/forgot-password',
                method: 'POST',
                body: { email }
            }),
        }),

        resetPassword: builder.mutation({
            query: ({ token, password }) => ({
                url: `/reset-password/${token}`,
                method: 'POST',
                body: { password }
            }),
        }),

        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials
            })
        }),

        logoutUser: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST'
            })
        }),

        getUser: builder.query({
            query: () => ({
                url: '/users',
                method: 'GET'
            }),
            refetchOnMount: true,
            invalidatesTags: ["User"]
        }),

        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'DELETE'
            })
        }),

        updateUserRole: builder.mutation({
            query: ({ userId, role }) => ({
                url: `/users/${userId}`,
                method: 'PUT',
                body: { role }
            }),
            refetchOnMount: true,
            invalidatesTags: ["User"]
        }),
    })
})

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useGetUserQuery, useDeleteUserMutation, useUpdateUserRoleMutation, useVerifyEmailMutation, useForgotPasswordMutation, useResetPasswordMutation } = authApi
export default authApi