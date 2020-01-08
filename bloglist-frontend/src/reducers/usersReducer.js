import usersService from '../services/users';
const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_USERS':
      return action.data;

    default:
      return state;
  }
};

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll();
    dispatch({
      type: 'LOAD_USERS',
      data: users,
    });
  };
};

export default usersReducer;
