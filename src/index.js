import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import RtlLayout from "layouts/rtl";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";

import { store } from "./app/store";
import { Provider } from "react-redux";

import RequireAuth from "RequireAuth";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <Provider store={store}>
        <ThemeEditorProvider>
          <HashRouter>
            <Switch>
              <Route path={`/auth`} component={AuthLayout} />
              <RequireAuth>
                <Route path={`/admin`} component={AdminLayout} />
              </RequireAuth>
              <Route path={`/rtl`} component={RtlLayout} />
              <Redirect from="/" to="/auth" />
            </Switch>
          </HashRouter>
        </ThemeEditorProvider>
      </Provider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
