import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentToken, setCredentials } from "./features/auth/authSlice";
import { Redirect, Route } from "react-router-dom";

const RequireAuth = ({ children, ...rest }) => {
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for the token in local storage
    const storedTokenObject = JSON.parse(localStorage.getItem("authToken"));
   
    if (storedTokenObject) {
      const { jwtToken, username } = storedTokenObject;
      // Set the token and username in your Redux store
      dispatch(setCredentials({ jwtToken, username }));
    }

    // Mark loading as complete
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    // Render a loading indicator or placeholder
    return <div>Loading...</div>;
  }

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
