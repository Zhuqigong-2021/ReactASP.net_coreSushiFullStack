import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { authApi } from "../Apis";
import { setupStore } from "./utils/store";

const store = setupStore({});

export const handlers = [
  rest.post("api/auth/login", (_req, res, ctx) => {
    return res(
      ctx.json({
        email: "admin@gmail.com",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZ…xNjJ9.dCA4R3t9Q2hliVtakxwqiUl1BE0wnfYbPqUQ542J-Ac",
      }),
      ctx.delay(4000)
    );
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => {
  server.resetHandlers();
  store.dispatch(authApi.util.resetApiState());
});

// Disable API mocking after the tests are done.
afterAll(() => server.close());
