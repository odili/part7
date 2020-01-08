import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { setUser } from './reducers/userReducer';
import LoginForm from './components/LoginForm';
import { initializeBlogs } from './reducers/blogReducer';
// import Notification from './components/Notification';
import { initializeUsers } from './reducers/usersReducer';
import Home from './pages/Home';
import NavMenu from './components/NavMenu';
import Users from './pages/Users';
import User from './pages/User';
import BlogDetails from './components/BlogDetails';
import { Container, Message } from 'semantic-ui-react';

function App() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const notification = useSelector(state => state.notification);

  React.useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  React.useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  if (user === null) {
    return <LoginForm />;
  }

  return (
    <Router>
      <Container>
        <header>
          <NavMenu />
          {notification && <Message success>{notification}</Message>}
        </header>
        <main style={{ marginTop: '3rem' }}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/users/:id">
              <User />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
          </Switch>
        </main>
      </Container>
    </Router>
  );
}

// const mapStateToProps = state => {
//   return {
//     user: state.user,
//     blogs: state.blogs,
//   };
// };
// export default connect(mapStateToProps, {
//   setNotification,
//   setUser,
//   initializeBlogs,
// })(App);
export default App;
