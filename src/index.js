import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import reducer from "./reducers";
import middleware from "./middlewares";
import "bootstrap/dist/css/bootstrap.min.css";

const store = createStore(reducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
