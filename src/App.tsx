import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoutes from "./routes/ProtectedRoutes"; //Authenticated routes
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import CircularProgressPage from "./Components/CircularProgressPage";
import { useAuthState } from "./context/authContext";
import { AppActionsProvider } from "./Providers/actionsProvider";

const SignInPage = lazy(() => import("./Pages/SignIn"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const NotFoundComponent = lazy(() => import("./Components/NotFoundComponent"));

const App = (): JSX.Element => {
  const { isAuthenticated } = useAuthState();

  return (
    <Router>
      <Suspense fallback={<CircularProgressPage />}>
        <Switch>
          <PublicRoute path="/signin" isAuthenticated={isAuthenticated} exact>
            <SignInPage />
          </PublicRoute>
          <PublicRoute path="/signup" isAuthenticated={isAuthenticated} exact>
            <SignUp />
          </PublicRoute>
          <PrivateRoute path="/" isAuthenticated={isAuthenticated}>
            <AppActionsProvider>
              <ProtectedRoutes />
            </AppActionsProvider>
          </PrivateRoute>
          <Route path="*">
            <NotFoundComponent />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
