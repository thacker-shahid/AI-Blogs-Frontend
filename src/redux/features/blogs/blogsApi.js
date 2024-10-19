import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const blogsApi = createApi({
    reducerPath: 'blogsApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:5000/api',
        credentials: 'include'
    }),
    tagTypes: ['Blogs'],
    endpoints: (builder) => ({
        fetchBlogs: builder.query ({
            query: () => `blogs`
        }),
        // fetchBlogs: builder.query ({
        //     query: ({search='', category='', location=''}) =>`/blogs?search=${search}&category=${category}&location=${location}`,
        //     providesTags: ['Blogs'], 
        // }),
        fetchBlogById: builder.query({
            query: (id) => `blogs/${id}`
        }),
        fetchRelatedBlogs: builder.query({
            query: (id) => `blogs/related/${id}`
        }),
        postBlog: builder.mutation({
            query: (newPost) => ({
                url: "/blogs/create-post",
                method: 'POST',
                body: newPost,
                credentials: 'include'
            }),
            invalidatesTags: [{ type: 'Blogs'}],
        }),

        updateBlog: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/blogs/update-post/${id}`,
                method: 'PATCH',
                body: rest,
                credentials: "include" 
            }),
            invalidatesTags: (result, error, {id}) => [{type: "Blogs", id}],
        }),

        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: 'DELETE',
                body: rest,
                credentials: "include" 
            }),
            invalidatesTags: (result, error, {id}) => [{type: "Blogs", id}],
        })
    })
  })

export const {useFetchBlogsQuery, useFetchBlogByIdQuery, useFetchRelatedBlogsQuery, usePostBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation } = blogsApi