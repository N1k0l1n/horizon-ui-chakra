import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./features/auth/authSlice";
import { Redirect, Route } from "react-router-dom";

const RequireAuth = ({ children, ...rest }) => {
  const token = useSelector(selectCurrentToken);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/auth/sign-in",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default RequireAuth;
