import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

const User = () => {
  let { id } = useParams();
  const users = useSelector(state => state.users);
  const user = users.find(u => u.id === id);
  // console.log(typeof id, users);
  return users.length > 0 ? (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <Table striped celled>
        <Table.Body>
          {user.blogs.map(blog => (
            <Table.Row key={blog.id}>
              <Table.Cell> {blog.title}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  ) : null;
};

export default User;
