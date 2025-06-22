import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const blogsApi = createApi({
    reducerPath: 'blogsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_URL + '/api',
        credentials: 'include'
    }),
    tagTypes: ['Blogs'],
    endpoints: (builder) => ({
        fetchBlogs: builder.query({
            query: ({ search = '', category = '', location = '' }) => `/blogs?search=${search}&category=${category}&location=${location}`,
            providesTags: ['Blogs'],
        }),
        fetchBlogById: builder.query({
            query: (id) => `blogs/${id}`
        }),
        fetchRelatedBlogs: builder.query({
            query: (id) => `blogs/related/${id}`
        }),
        postBlog: builder.mutation({
            query: ({ newPost, token }) => ({
                url: "/blogs/create-post",
                method: 'POST',
                body: newPost,
                headers: {
                    Authorization: `Bearer ${token}`, // 🔑 Set the token here
                },
                credentials: 'include'
            }),
            invalidatesTags: [{ type: 'Blogs' }],
        }),

        updateBlog: builder.mutation({
            query: ({ id, token, ...rest }) => ({
                url: `/blogs/update-post/${id}`,
                method: 'PATCH',
                body: rest,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include"
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Blogs", id }],
        }),

        deleteBlog: builder.mutation({
            query: ({ id, token }) => ({
                url: `/blogs/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`, // 🔑 Set the token here
                },
                credentials: "include"
            }),
            // invalidatesTags: (result, error, { id }) => [{ type: "Blogs", id }],
        })
    })
})

export const { useFetchBlogsQuery, useFetchBlogByIdQuery, useFetchRelatedBlogsQuery, usePostBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation } = blogsApi