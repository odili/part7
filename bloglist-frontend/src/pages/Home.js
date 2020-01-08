import React from 'react';
import Togglable from '../components/Togglable';
import NewBlogForm from '../components/NewBlogForm';
import BlogList from '../components/BlogList';

const Home = () => {
  const blogFormRef = React.createRef();

  return (
    <>
      <h2> blog app</h2>

      <Togglable buttonLabel="create new" ref={blogFormRef}>
        <NewBlogForm />
      </Togglable>
      <BlogList />
    </>
  );
};

export default Home;
