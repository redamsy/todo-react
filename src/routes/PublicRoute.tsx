import { Route, Redirect, RouteProps } from "react-router-dom";

interface IPublicRouteProps extends RouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

function PublicRoute({
  children,
  isAuthenticated,
  ...rest
}: IPublicRouteProps): JSX.Element {
  console.log("PublicRoute", rest.path, isAuthenticated);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PublicRoute;
