import { configureStore } from '@reduxjs/toolkit'
import { blogsApi } from './features/blogs/blogsApi'
import { authApi } from './features/auth/authApi'
import { commentApi } from './features/comments/commentApi'
import { contactUsApi } from './features/contactus/contactusApi'
import authReducer from './features/auth/authSlice'
import darkModeReducer from './features/darkmode/darkModeSlice'
import geminiAIApi from './features/geminiai/ai.geminiAPI'

export const store = configureStore({
  reducer: {
    [blogsApi.reducerPath]: blogsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [contactUsApi.reducerPath]: contactUsApi.reducer,
    [geminiAIApi.reducerPath]: geminiAIApi.reducer,
    auth: authReducer,
    theme: darkModeReducer
  },
  // Below code is simply used for caching
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogsApi.middleware, authApi.middleware, commentApi.middleware, contactUsApi.middleware, geminiAIApi.middleware)
})