import userService from '../services/login';
import blogService from '../services/blogs';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      window.localStorage.setItem(
        'loggedInBlogUser',
        JSON.stringify(action.data)
      );
      blogService.setToken(action.data.token);
      return action.data;

    case 'LOGOUT':
      window.localStorage.clear();
      // state = null;
      window.location.reload();
      return;

    case 'LOAD_USER':
      blogService.setToken(action.data.token);
      return action.data;

    default:
      return state;
  }
};

export const login = credentials => {
  return async dispatch => {
    const user = await userService.login(credentials);
    dispatch({
      type: 'LOGIN',
      data: user,
    });
  };
};

export const setUser = user => {
  return async dispatch => {
    dispatch({
      type: 'LOAD_USER',
      data: user,
    });
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({
      type: 'LOGOUT',
    });
  };
};

export default userReducer;
