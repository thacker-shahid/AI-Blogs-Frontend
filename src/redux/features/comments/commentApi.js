import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://ai-blogs.onrender.com/api/comments',
        credentials: 'include'
    }),
    tagTypes: ['Comments'],

    endpoints: (builder) => ({
        postComment: builder.mutation({  // mutation is used when we need to send something to the database.
            query: (commentData) => ({
                url: '/post-comment',
                method: 'POST',
                body: commentData
            }),
            invalidatesTags: (result, error, { postId }) => [{ type: "Comments", id: postId }]
        }),

        getComment: builder.query({  // mutation is used when we need to send something to the database.
            query: () => ({
                url: '/total-comments',
                method: 'GET',
            })
        }),

        getAllComment: builder.query({  // mutation is used when we need to send something to the database.
            query: () => ({
                url: '/all-comments',
                method: 'GET',
            })
        }),

        deleteComment: builder.mutation({  // mutation is used when we need to send something to the database.
            query: (id) => ({
                url: `/delete-comment/${id}`,
                method: 'DELETE',
                credentials: 'include'
            })
        }),
        // invalidatesTags: (result, error, { id }) => [{ type: "Comments", id }]
    })
})

export const { usePostCommentMutation, useGetCommentQuery, useGetAllCommentQuery, useDeleteCommentMutation } = commentApi
export default commentApi