import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { like, remove, addComment } from '../reducers/blogReducer';
import { useField } from '../hooks';
import { Form, Button } from 'semantic-ui-react';
import removeReset from '../utils/removeReset';

const BlogDetails = () => {
  let { id } = useParams();
  const content = useField('text');
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const blog = blogs.find(b => b.id === id);
  // console.log(id);

  const likeBlog = async e => {
    const update = {
      likes: blog.likes + 1,
    };
    try {
      dispatch(like(blog.id, update));
      dispatch(setNotification(`you likes ${blog.title}`));
    } catch (error) {
      dispatch(setNotification(error.message));
    }
  };

  const removeBlog = async e => {
    const blogToRemove = blogs.find(b => b.id === e.target.value);

    try {
      if (window.confirm(`remove blog "${blogToRemove.title}" ?`)) {
        dispatch(remove(blogToRemove.id));
        dispatch(setNotification(`${blogToRemove.title} removed !`));
      }
    } catch (error) {
      dispatch(setNotification(error.message));
    }
  };

  const postComment = e => {
    e.preventDefault();
    const draftComment = {
      content: content.value,
      blog: blog.id,
    };
    // console.log(draftComment);
    dispatch(addComment(blog.id, draftComment));
    content.reset();
  };

  return blogs.length > 0 ? (
    <div style={{ marginTop: '3rem' }}>
      <h2>{blog.title}</h2>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        {`${blog.likes} likes  `}
        <Button id="like" size="mini" value={blog.id} onClick={likeBlog}>
          like
        </Button>
      </p>
      <p>
        <small>{`added by ${blog.user.name}`}</small>
      </p>
      {blog.user.name === user.name ? (
        <Button size="small" secondary value={blog.id} onClick={removeBlog}>
          remove
        </Button>
      ) : null}
      <div style={{ marginTop: '3rem' }}>
        <h3>comments</h3>
        <Form onSubmit={postComment}>
          <Form.Field>
            <label></label>
            <input
              placeholder="Enter Comment here..."
              {...removeReset(content)}
            />
          </Form.Field>
          <Button primary>add comment</Button>
        </Form>
        <ul>
          {blog.comments.map(comment => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      </div>
    </div>
  ) : null;
};

// const mapStateToProps = state => {
//   return {
//     user: state.user,
//     blogs: state.blogs,
//   };
// };

// export default connect(mapStateToProps, { setNotification, like, remove })(
//   BlogDetails
// );
export default BlogDetails;
