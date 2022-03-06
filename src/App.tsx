
import React , {useEffect} from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { useTypedSelector } from './hooks/useTypeSelector';
import Layout from './components/Layout'
import Login from './views/Login'
import Posts from './views/Posts'
import AddPost from './views/AddPost'
import ViewPost from './views/ViewPost'

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
  const history = useHistory()
  const {logInUser } = useTypedSelector((state) => state.auth);
  let token = localStorage.getItem('token')


  useEffect(() => {
    
    if(location && location.pathname === '/' && !token){
      history.push('/Login')
    }
    else if (location && location.pathname === '/' && token){
      history.push('/Posts')
    }

  }, [location])
  

  return (
    <>
      <Switch>
        <Route exact path="/login"  render={(props) => <Login />} />

        <PrivateRoute
          path="/Posts"
          token={token}
          component={Posts}
        />
        <PrivateRoute
          path="/addPost"
          token={token}
          component={AddPost}
        />
         <PrivateRoute
          path="/viewPost"
          token={token}
          component={ViewPost}
        />
      </Switch>
    </>
  );
};

export default App;
