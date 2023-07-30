import { screen, waitFor } from "@testing-library/react";

// import { Home } from "./Components";
import { expect, it } from "vitest";

import { Login } from "../../Pages";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../utils/renderWithProvider";

beforeEach(() => {
  renderWithProviders(<Login />);
});

interface formProps {
  email?: string;
  password?: string;
}
const typeIntoForm = async ({ email, password }: formProps) => {
  const emailInputElement = screen.getByRole("textbox") as HTMLInputElement;
  if (email) {
    await userEvent.type(emailInputElement, email);
  }
  const passwordInputElement = screen.getByLabelText(
    /password/i
  ) as HTMLInputElement;
  if (password) {
    await userEvent.type(passwordInputElement, password);
  }
  return { emailInputElement, passwordInputElement };
};

const clickOnSubmit = async () => {
  const submitBtnElement = screen.getByRole("button", { name: "Sign in" });
  await userEvent.click(submitBtnElement);
};

describe("default state", () => {
  it("initial render should be empty", () => {
    expect(screen.getByLabelText<HTMLInputElement>(/Your Email/i).value).toBe(
      ""
    );
    expect(screen.getByLabelText<HTMLInputElement>(/password/i).value).toBe("");
    expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
  });

  it("should be able to type an email", async () => {
    const { emailInputElement } = await typeIntoForm({
      email: "phil@gmail.com",
    });
    expect(emailInputElement.value).toBe("phil@gmail.com");
  });

  it("should be able to type an password", async () => {
    const { passwordInputElement } = await typeIntoForm({
      password: "123123",
    });
    expect(passwordInputElement.value).toBe("123123");
  });
});

describe("error handling", () => {
  it("should show error user or password is empty", async () => {
    //validation error is not there

    expect(
      screen.queryByText(/Username or password is incorrect/i)
    ).not.toBeInTheDocument();

    //no input

    await clickOnSubmit();
    expect(screen.queryByText(/user name is empty/i)).toBeInTheDocument();

    //just type email without the password
    await typeIntoForm({ email: "phil@gmail.com" });
    await clickOnSubmit();
    expect(screen.queryByText(/password is empty/i)).toBeInTheDocument();
  });

  it("should show no error if user input is valid", async () => {
    //type legal username and password
    await typeIntoForm({ email: "phil@gmail.com", password: "123123" });

    await clickOnSubmit();

    //suppose error not to be in the doc
    expect(
      screen.queryByText(/Username or password is incorrect/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/user name is empty/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/password is empty/i)).not.toBeInTheDocument();
  });

  describe("Login process", () => {
    it("Login sucess", async () => {
      const text = screen.getByText(/Sign in to your account/i);
      // expect(window.location.pathname).toBe("/login");
      expect(text).toBeInTheDocument();
      // await typeIntoForm({ email: "phil@gmail.com", password: "123123" });
      await typeIntoForm({ email: "ok@gmail.com", password: "123123" });
      await clickOnSubmit();
      const spinner = await screen.findByTestId(/No data/i);
      expect(spinner).toBeInTheDocument();

      // after some time, the user should be received

      await waitFor(() => {
        expect(window.location.pathname).toBe("/home");
        // expect(
        //   screen.getByText(
        //     /A healthy meal delivered to your door, every single day/i
        //   )
        // ).toBeInTheDocument();
      });
    });
  });
});
