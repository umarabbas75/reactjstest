
import React , {useEffect} from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import Layout from './components/Layout'
import Login from './views/Login'
import Posts from './views/Posts'
import AddPost from './views/AddPost'
import ViewPost from './views/ViewPost'



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

  const location = useLocation();
  const history = useHistory()
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
