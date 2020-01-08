const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NOTIFY':
      // console.log(action.data);
      return action.data;
    case 'CLEAR':
      return null;
    default:
      return state;
  }
};

export const setNotification = (message, delay = 5) => {
  const timeout = secs => {
    return new Promise(resolve => setTimeout(resolve, secs * 1000));
  };
  return async dispatch => {
    dispatch({
      type: 'NOTIFY',
      data: message,
    });
    await timeout(delay);
    dispatch({
      type: 'CLEAR',
    });
  };
};

export default notificationReducer;
