import { render, screen } from "@testing-library/react";
import App from "./App";
// import matchers from "@testing-library/jest-dom";
// expect.extend(matchers);
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { Home } from "./Components";
import { expect, it } from "vitest";

beforeEach(() => {
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
});
it("should have text Hello Word ", () => {
  screen.debug();
});
it("it should render a button with text Start eating well", () => {
  screen.getByRole("button", { name: /Start eating well/i });
  screen.getByText(/A healthy meal delivered to your door, every single day/i);
});

it("it should render text A healthy...", () => {
  const text = screen.getByText(
    /A healthy meal delivered to your door, every single day/i
  );
  expect(text).toBeInTheDocument();
});
