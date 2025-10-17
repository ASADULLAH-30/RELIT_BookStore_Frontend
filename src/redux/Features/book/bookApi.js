import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseUrl'

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/books`,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const bookApi = createApi({
    reducerPath: "bookApi",
    baseQuery,
    tagTypes: ['Books'],
    endpoints: (builder) => ({

        // ✅ Get all books
        fetchAllBooks: builder.query({
            query: () => "/",
            providesTags: ["Books"]
        }),

        // ✅ Get one book by ID
        fetchBookById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Books", id }],
        }),

        // ✅ Add a book
        addBook: builder.mutation({
            query: (newBook) => ({
                url: '/create-book',
                method: "POST",
                body: newBook
            }), 
            invalidatesTags: ["Books"]
        }),

        // ✅ Update a book
        updateBook: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Books"],
        }),

        // ✅ Delete a book
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Books"],
        })
    })
});

// ✅ Auto-generated hooks
export const { 
    useFetchAllBooksQuery, 
    useFetchBookByIdQuery, 
    useAddBookMutation, 
    useUpdateBookMutation,
    useDeleteBookMutation 
} = bookApi;

export default bookApi;
