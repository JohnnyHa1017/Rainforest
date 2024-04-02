import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import configureStore from "./redux/store";
import { router } from "./router";
import * as sessionActions from "./redux/session";
// import CartPersistenceWrapper from "./utils/PersistingCartWrapper";
import "./index.css";

const store = configureStore();

if (import.meta.env.MODE !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      {/* <CartPersistenceWrapper> */}
        <RouterProvider router={router} />
      {/* </CartPersistenceWrapper> */}
    </ReduxProvider>
  </React.StrictMode>
);
