import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

const Blog = ({ blog }) => {
  return (
    <Table.Row>
      <Table.Cell>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </Table.Cell>
      <Table.Cell>{blog.author}</Table.Cell>
    </Table.Row>
  );
};

// Blog.propTypes = {
//   blog: PropTypes.object.isRequired,
//   likeBlog: PropTypes.func.isRequired,
//   removeBlog: PropTypes.func.isRequired,
//   user: PropTypes.object.isRequired,
// };

export default Blog;
