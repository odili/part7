import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import removeReset from '../utils/removeReset';
import { useField } from '../hooks';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const NewBlogForm = props => {
  const dispatch = useDispatch();
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');
  const likes = useField('number');

  const addBlog = async e => {
    e.preventDefault();
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: likes.value,
    };
    try {
      dispatch(createBlog(newBlog));
      title.reset();
      author.reset();
      url.reset();
      likes.reset(0);
      dispatch(setNotification(`${newBlog.title} added successfully !`));
    } catch (error) {
      dispatch(setNotification(error.message));
    }
  };

  return (
    <div>
      <h3>create new</h3>
      <Form onSubmit={addBlog}>
        <Form.Field>
          <label>title:</label>
          <input id="title" placeholder="title" {...removeReset(title)} />
        </Form.Field>
        <Form.Field>
          <label>author:</label>
          <input id="author" placeholder="author" {...removeReset(author)} />
        </Form.Field>
        <Form.Field>
          <label>url:</label>
          <input id="url" placeholder="url" {...removeReset(url)} />
        </Form.Field>
        <Form.Field>
          <label>likes:</label>
          <input id="likes" placeholder="3 likes" {...removeReset(likes)} />
        </Form.Field>
        <Button id="create" primary type="submit">
          create
        </Button>
      </Form>
    </div>
  );
};

// export default connect(null, { setNotification, createBlog })(NewBlogForm);
export default NewBlogForm;
