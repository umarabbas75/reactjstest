
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { useTypedSelector } from './hooks/useTypeSelector';
import Login from './views/Login'
import Posts from './views/Posts'

const RestrictedRoute = ({
  component: Component,
  location,
  token,
  authUser,
  permissions,
  ...rest
}: any) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (token) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          );
        }
      }}
    />
  );
};

const App = () => {
  const match = useRouteMatch();
  const location = useLocation();
  const {logInUser } = useTypedSelector((state) => state.auth);
  let token = ''
  return (
    <>
      <Switch>
        <Route exact path="/login"  render={(props) => <Login />} />

        <RestrictedRoute
          path={`${match.url}`}
          token={token}
          authUser={logInUser}
          location={location}
          component={Posts}
        />
      </Switch>
    </>
  );
};

export default App;
