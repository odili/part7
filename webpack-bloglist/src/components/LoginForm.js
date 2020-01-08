import React from 'react';
import { useDispatch } from 'react-redux';
import removeReset from '../utils/removeReset';
import { useField } from '../hooks';
import { Form, Button, Container } from 'semantic-ui-react';
import { login } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';
import Notification from './Notification';

const LoginForm = props => {
  const dispatch = useDispatch();
  const username = useField('text');
  const password = useField('password');

  const handleLogin = e => {
    e.preventDefault();
    const user = username.value;
    try {
      dispatch(
        login({
          username: user,
          password: password.value,
        })
      );
      // window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user));
      // blogServices.setToken(user.token);
      // setUser(user);
      dispatch(setNotification(`welcome ${user}`));
      username.reset();
      password.reset();
      // setSuccessMessage(`welcome ${user.name}`);
      // setTimeout(() => {
      //   setSuccessMessage(null);
      // }, 5000);
    } catch (error) {
      console.log(error.message);
      dispatch(setNotification('Wrong credentials'));
      // setErrorMessage('Wrong credentials');
      // setTimeout(() => {
      //   setErrorMessage(null);
      // }, 5000);
    }
  };

  return (
    <Container>
      <Notification />
      <h2>log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Field>
          <label>username</label>
          <input id="username" {...removeReset(username)} />
        </Form.Field>
        <Form.Field>
          <label>password</label>
          <input id="password" {...removeReset(password)} />
        </Form.Field>
        <Button type="submit">login</Button>
      </Form>
    </Container>
  );
};

// export default connect(null, { login, setNotification })(LoginForm);

export default LoginForm;
