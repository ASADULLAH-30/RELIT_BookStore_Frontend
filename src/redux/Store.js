import { configureStore } from '@reduxjs/toolkit'
// Make sure the import matches your actual file name and path
import cartReducer from '../redux/Features/cart/CartSlice'
import bookApi from './Features/book/bookApi'
import orderApi from './Features/Orders/orderApi'

// Configure the Redux store
export const store = configureStore({
  reducer: {
    // Add your cart slice reducer under the 'cart' key
    cart: cartReducer,
    // Add your bookApi reducer using computed property syntax
    [bookApi.reducerPath]: bookApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  // Add bookApi middleware for RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware, orderApi.middleware),
})