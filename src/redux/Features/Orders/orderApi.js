// ✅ Use ES Modules consistently (recommended for Redux Toolkit with modern setups)
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseUrl";

// Define the API slice
const orderApi = createApi({
  reducerPath: "orderApi", // unique key in Redux store
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl() + "/api/orders", // API base URL
    credentials: "include", // send cookies with requests
  }),
  tagTypes: ["Orders"], // for cache invalidation
  endpoints: (builder) => ({
    // --- Create Order Mutation ---
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/", // relative to baseUrl
        method: "POST",
        body: newOrder,
        credentials: "include"
      }),
      // When a new order is created, invalidate "Orders" cache so it's refetched
      invalidatesTags: ["Orders"],
    }),

    // --- Get Orders by Email Query ---
    getOrdersByEmail: builder.query({
      query: (email) => ({
        url: `/email/${email}`,
      }),
      providesTags: ["Orders"],
    }),
  }),
});

// ✅ Export auto-generated hooks from orderApi, not createApi itself
export const { useCreateOrderMutation, useGetOrdersByEmailQuery } = orderApi;
export default orderApi;
