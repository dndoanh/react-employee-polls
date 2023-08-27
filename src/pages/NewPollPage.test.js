import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import NewPollPage from "./NewPollPage";
import { createStore } from "redux";
import reducer from "../reducers";
import middleware from "../middlewares";

const store = createStore(reducer, middleware);

describe("NewPollPage", () => {
  test("should render all components", () => {
    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPollPage />
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
          <NewPollPage />
        </BrowserRouter>
      </Provider>
    );
    const options = { optionOne: "New Jersey", optionTwo: "Alabama" };
    const firstOptionInputElement = screen.getByTestId("option-one-input");
    const secondOptionInputElement = screen.getByTestId("option-two-input");
    const submitButtonElement = screen.getByTestId("btn-submit-poll");

    fireEvent.change(firstOptionInputElement, {
      target: { value: options.optionOne },
    });
    fireEvent.change(secondOptionInputElement, {
      target: { value: options.optionTwo },
    });
    
    expect(submitButtonElement.textContent).toBe("Submit");
    expect(firstOptionInputElement.value).toBe(options.optionOne);
    expect(secondOptionInputElement.value).toBe(options.optionTwo);
  });
});
