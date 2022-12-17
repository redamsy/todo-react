import { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import CircularProgressPage from "../Components/CircularProgressPage";
import routes from "./authenticatedRoutes"; // Route list

const ProtectedRoutes = (): JSX.Element => (
  <Switch>
    <Suspense fallback={<CircularProgressPage />}>
      {routes.map(({ component: Component, path, exact }) => (
        <Route path={`/${path}`} key={path} exact={exact}>
          <Component />
        </Route>
      ))}
    </Suspense>
  </Switch>
);

export default ProtectedRoutes;
