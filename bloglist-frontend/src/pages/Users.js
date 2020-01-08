import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

const Users = () => {
  const users = useSelector(state => state.users);
  return (
    <>
      <h2>users</h2>

      <Table striped celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>blogs created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </Table.Cell>
              <Table.Cell>{user.blogs.length}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default Users;
