import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { setNotification } from '../reducers/notificationReducer';
import { logout } from '../reducers/userReducer';

const NavMenu = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setNotification(`bye ${user.name}`));
    dispatch(logout());
  };

  return (
    <Menu inverted>
      <Menu.Item link>
        <Link to={'/'}>blogs</Link>
      </Menu.Item>
      <Menu.Item link>
        <Link to={'/users'}>users</Link>
      </Menu.Item>
      <Menu.Item>
        <span>{user.name} logged in</span>
      </Menu.Item>
      <Menu.Item link onClick={handleLogout}>
        logout
      </Menu.Item>
    </Menu>
  );
};

export default NavMenu;
