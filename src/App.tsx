
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { useTypedSelector } from './hooks/useTypeSelector';
import Layout from './components/Layout'
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

const PrivateRoute = ({component: Component,token ,...rest}:any) => {
  return (

      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /signin page
      <Route {...rest} render={props => (
          token ?<Layout> <Component {...props} /></Layout> : <Redirect to="/login" />
      )} />
  );
};

const App = () => {
  const match = useRouteMatch();
  const location = useLocation();
  const {logInUser } = useTypedSelector((state) => state.auth);
  let token = localStorage.getItem('token')

  return (
    <>
      <Switch>
        <Route exact path="/login"  render={(props) => <Login />} />

        <PrivateRoute
          path="/Posts"
          token={token}
          component={Posts}
        />
      </Switch>
    </>
  );
};

export default App;
