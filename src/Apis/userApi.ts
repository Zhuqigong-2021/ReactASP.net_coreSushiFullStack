import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sushibackend.azurewebsites.net/api/",
    // baseUrl: "https://sushiapi1.azurewebsites.net/api/",
  }),
  tagTypes: ["Users", "Roles"],
  endpoints: (builder) => ({
    // getUsers: builder.query({
    //   query: () => ({
    //     url: "User",
    //   }),
    //   providesTags: ["Users"],
    // }),

    getUsers: builder.query({
      query: ({ searchString, pageNumber, pageSize }) => ({
        url: "User",
        method: "GET",
        params: {
          ...(searchString && { searchString }),
          ...(pageSize && { pageSize }),
          ...(pageNumber && { pageNumber }),
        },
      }),
      transformResponse(apiResponse: { result: any }, meta: any) {
        return {
          apiResponse,
          totalRecords: meta.response.headers.get("X-Pagination"),
        };
      },
      providesTags: ["Users"],
    }),
    getRoles: builder.query({
      query: () => ({
        url: "User/allRoles",
      }),
      providesTags: ["Roles"],
    }),
    updateUserRole: builder.mutation({
      query: ({ userId, roleId }) => ({
        url: "User/updateUserRole",
        method: "PUT",
        params: {
          userId: userId,
          roleId: roleId,
        },
      }),
      invalidatesTags: ["Users", "Roles"],
    }),
    updateUserPhone: builder.mutation({
      query: ({ userId, phone }) => ({
        url: "User/updatePhoneNumber",
        method: "PUT",
        params: {
          userId: userId,
          phone: phone,
        },
      }),
      invalidatesTags: ["Users", "Roles"],
    }),

    deleteUser: builder.mutation({
      query: ({ userId }) => ({
        url: "User/delete",
        method: "DELETE",
        params: {
          userId,
        },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetRolesQuery,
  useUpdateUserRoleMutation,
  useUpdateUserPhoneMutation,
  useDeleteUserMutation,
} = userApi;
export default userApi;
