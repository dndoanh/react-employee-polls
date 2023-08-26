import { createStore } from "redux";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./LoginPage";
import React from "react";
import reducer from "../reducers";
import middleware from "../middlewares";

const store = createStore(reducer, middleware);

describe("LoginPage", () => {
  test("should render the components", () => {
    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
    expect(view).toBeDefined();
    expect(view).toMatchSnapshot();
  });

  test("should display all elements", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
    const userInput = { username: "tony", password: "ezekiel" };
    const usernameInputElement = screen.getByTestId("username-input");
    const passwordInputElement = screen.getByTestId("password-input");
    const submitButtonElement = screen.getByTestId("submit-login");

    expect(submitButtonElement.textContent).toBe("Login");

    fireEvent.change(usernameInputElement, {
      target: { value: userInput.username },
    });
    fireEvent.change(passwordInputElement, {
      target: { value: userInput.password },
    });
    expect(usernameInputElement.value).toBe(userInput.username);
    expect(passwordInputElement.value).toBe(userInput.password);
  });

  test("should display error message when username or password is not correct", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
    const userInput = { username: "tony", password: "ezekiel" };
    const usernameInputElement = screen.getByTestId("username-input");
    const passwordInputElement = screen.getByTestId("password-input");
    const submitButtonElement = screen.getByTestId("submit-login");

    fireEvent.change(usernameInputElement, {
      target: { value: userInput.username },
    });
    fireEvent.change(passwordInputElement, {
      target: { value: userInput.password },
    });
    fireEvent.click(submitButtonElement);

    const errorMessageElement = screen.getByTestId("error-message");
    expect(errorMessageElement.textContent).toBe(
      "Invalid username or password"
    );
  });
});
