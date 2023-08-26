import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Navi from "./Navi";
import { createStore } from "redux";
import middleware from "../middlewares";
import reducer from "../reducers";
import { loginAuthedUser } from "../actions/authedUser";

const store = createStore(reducer, middleware);

describe("Navi", () => {
  test("should render the components", () => {
    store.dispatch(
      loginAuthedUser({
        id: "tylermcginnis",
        name: "Tyler Alibaba",
      })
    );
    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <Navi />
        </BrowserRouter>
      </Provider>
    );
    expect(view).toBeDefined();
    expect(view).toMatchSnapshot();
  });

  test("should display all elements", () => {
    store.dispatch(
      loginAuthedUser({
        id: "tylermcginnis",
        name: "Tyler Alibaba",
      })
    );
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navi />
        </BrowserRouter>
      </Provider>
    );

    const homeLinkElement = screen.getByTestId("home-link");
    const newPollLinkElement = screen.getByTestId("new-poll-link");
    const leaderboardLinkElement = screen.getByTestId("leaderboard-link");
    const logoutLinkElement = screen.getByTestId("logout-link");

    expect(homeLinkElement.textContent).toBe("Home");
    expect(newPollLinkElement.textContent).toBe("New Poll");
    expect(leaderboardLinkElement.textContent).toBe("Leaderboard");
    expect(logoutLinkElement.textContent).toBe("Logout");
  });
});
