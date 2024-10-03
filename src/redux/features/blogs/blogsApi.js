import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const blogsApi = createApi({
    reducerPath: 'blogsApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:5000/api'
    }),
    endpoints: (builder) => ({
        fetchBlogs: builder.query ({
            query: () => `blogs`
        }),
        // fetchBlogs: builder.query ({
        //     query: (search='', category='', location='') => {
        //         `/blogs?search=${search}&category=${category}&location=${location}`
        //     }
        // }),
        fetchBlogById: builder.query({
            query: (id) => `blogs/${id}`
        }),
        fetchRelatedBlogs: builder.query({
            query: (id) => `blogs/related/${id}`
        })
    })
  })

export const {useFetchBlogsQuery, useFetchBlogByIdQuery, useFetchRelatedBlogsQuery } = blogsApi