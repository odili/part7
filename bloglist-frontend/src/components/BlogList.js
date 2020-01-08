import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';
import Blog from './Blog';
import { arrayObjectSort } from '../utils/arrayObjectSort';

const BlogList = ({ blogs }) => {
  const sortedBlogs = blogs.sort(arrayObjectSort('likes', 'desc'));
  return (
    <Table striped celled>
      <Table.Body>
        {sortedBlogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </Table.Body>
    </Table>
  );
};

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
  };
};
export default connect(mapStateToProps)(BlogList);
