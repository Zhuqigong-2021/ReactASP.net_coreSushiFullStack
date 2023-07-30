import { screen } from "@testing-library/react";

// import matchers from "@testing-library/jest-dom";
// expect.extend(matchers);

// import { Home } from "./Components";
import { it } from "vitest";

import { MyOrders } from "../../Pages";
import { renderWithProviders } from "../utils/renderWithProvider";
// import { rest } from "msw";
// import { setupServer } from "msw/node";
// beforeEach(() => {});
// function mockRedux(children: ReactNode) {
//   const initialState = { id: 10 };
//   const mockStore = configureStore();
//   let store;
//   store = mockStore(initialState);
//   render(
//     <Provider store={store}>
//       <BrowserRouter>{children}</BrowserRouter>
//     </Provider>
//   );
// }
// export const handlers = [
//   rest.get("/api/user", (req, res, ctx) => {
//     return res(ctx.json("John Smith"), ctx.delay(150));
//   }),
// ];

describe("My orders test", () => {
  it("should render MyOrders page", async () => {
    renderWithProviders(<MyOrders />);
    let Header = await screen.queryByText(/My Orders/i);
    expect(Header).not.toBeInTheDocument();
  });
});
