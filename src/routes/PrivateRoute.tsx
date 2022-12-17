import { Route, Redirect, RouteProps } from "react-router-dom";

interface IPrivateRouteProps extends RouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

function PrivateRoute({
  children,
  isAuthenticated,
  ...rest
}: IPrivateRouteProps): JSX.Element {
  console.log("PrivateRoute", rest.path, isAuthenticated);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
