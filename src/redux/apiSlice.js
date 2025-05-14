import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => {
        const { limit } = params || {}
        return limit ? `/products?limit=${limit}` : "/products"
      },
    }),
    getProduct: builder.query({
      query: (id) => `/products/${id}`,
    }),
    getCategories: builder.query({
      query: () => "/products/categories",
    }),
    getProductsByCategory: builder.query({
      query: (category) => `/products/category/${category}`,
    }),
  }),
})

export const { useGetProductsQuery, useGetProductQuery, useGetCategoriesQuery, useGetProductsByCategoryQuery } =
  apiSlice
