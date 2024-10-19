import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:5000/api/comments',
        credentials: 'include'
    }),
    tagTypes: ['Comments'],

    endpoints: (builder) => ({
        postComment: builder.mutation({  // mutation is used when we need to send something to the database.
            query: (commentData) =>({
                url: '/post-comment',
                method: 'POST',
                body: commentData
            }),
            invalidatesTags: (result, error, {postId}) => [{type: "Comments", id: postId}]
        }),

        getComment: builder.query({  // mutation is used when we need to send something to the database.
            query: () =>({
                url: '/total-comments',
                method: 'GET',
            })
        }),
    })
  })

export const {usePostCommentMutation, useGetCommentQuery} = commentApi
export default commentApi