import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const shoppingCartApi = createApi({
  reducerPath: "shoppingCartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sushibackend.azurewebsites.net/api/",
    // baseUrl: "https://localhost:7268/api",
    prepareHeaders: (headers: Headers) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  tagTypes: ["ShoppingCarts"],
  endpoints: (builder) => ({
    getShoppingCart: builder.query({
      query: (userId) => ({
        url: `shoppingcart`,
        params: {
          userId: userId,
        },
      }),
      providesTags: ["ShoppingCarts"],
    }),
    updateShoppingCart: builder.mutation({
      query: ({ menuItemId, updateQuantityBy, userId }) => ({
        url: "shoppingcart",
        method: "POST",
        params: {
          menuItemId,
          updateQuantityBy,
          userId,
        },
      }),
      invalidatesTags: ["ShoppingCarts"],
    }),
    clearShoppingCart: builder.mutation({
      query: ({ userId }) => ({
        url: "shoppingcart/emptyShoppingCart",
        method: "DELETE",
        params: {
          userId,
        },
      }),
      invalidatesTags: ["ShoppingCarts"],
    }),
  }),
});

export const {
  useGetShoppingCartQuery,
  useUpdateShoppingCartMutation,
  useClearShoppingCartMutation,
} = shoppingCartApi;
export default shoppingCartApi;
