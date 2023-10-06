import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentToken, setCredentials } from "./features/auth/authSlice";
import { Redirect, Route } from "react-router-dom";
import Lottie from "lottie-react";
import Loader from "./assets/img/iKanbi/Loader.json";

const loaderStyles = {
  width: "500px", // Adjust the width to make it smaller
  height: "500px", // Adjust the height to make it smaller
  margin: "auto", // Center the loader horizontally
};

const RequireAuth = ({ children, ...rest }) => {
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a 2-second delay
    const delay = setTimeout(() => {
      // Check for the token in local storage
      const storedTokenObject = JSON.parse(localStorage.getItem("authToken"));

      if (storedTokenObject) {
        const { jwtToken, username } = storedTokenObject;
        // Set the token and username in your Redux store
        dispatch(setCredentials({ jwtToken, username }));
      }

      // Mark loading as complete
      setLoading(false);
    }, 2000);

    // Clean up the timeout in case the component unmounts
    return () => clearTimeout(delay);
  }, [dispatch]);

  if (loading) {
    // Render a loading indicator or placeholder
    return (
      <div style={loaderStyles}>
        <Lottie animationData={Loader} alt="loader" />
      </div>
    );
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
