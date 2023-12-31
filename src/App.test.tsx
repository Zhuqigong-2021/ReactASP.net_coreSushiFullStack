import { render, screen } from "@testing-library/react";
import App from "./App";
// import matchers from "@testing-library/jest-dom";
// expect.extend(matchers);
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
// import { Home } from "./Components";
import { it } from "vitest";

beforeEach(() => {
  mockRedux();
});
function mockRedux() {
  const initialState = { id: 10 };
  const mockStore = configureStore();
  let store;
  store = mockStore(initialState);
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}
it("should have text Hello Word ", () => {
  screen.debug();
});
