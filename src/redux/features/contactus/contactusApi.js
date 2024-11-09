import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const contactUsApi = createApi({
    reducerPath: 'contactUsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_URL + '/api/contact-us',
        // credentials: 'include'
    }),
    tagTypes: ['ContactUs'],

    endpoints: (builder) => ({
        postForm: builder.mutation({  // mutation is used when we need to send something to the database.
            query: (data) => ({
                url: '/',
                method: 'POST',
                body: data
            }),
            // invalidatesTags: (result, error, { postId }) => [{ type: "Comments", id: postId }]
        })
    })
})

export const { usePostFormMutation } = contactUsApi
export default contactUsApi