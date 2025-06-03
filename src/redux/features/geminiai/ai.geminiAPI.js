import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const geminiAIApi = createApi({
    reducerPath: 'geminiAIApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_URL + '/api/gemini-ai',
        credentials: 'include'
    }),

    endpoints: (builder) => ({
        getAiData: builder.mutation({  // mutation is used when we need to send something to the database.
            query: (data) => ({
                url: '/',
                method: 'POST',
                body: data,
                credentials: 'include'
            }),
        })
    })
})

export const { useGetAiDataMutation } = geminiAIApi
export default geminiAIApi