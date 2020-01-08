import blogService from '../services/blogs';
import commentService from '../services/comment';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;

    case 'CREATE':
      return state.concat(action.data);

    case 'LIKE':
      let liked = state.find(b => b.id === action.data.id);
      liked = { ...liked, likes: action.data.likes };
      return state.map(b => (b.id !== liked.id ? b : liked));

    case 'DELETE':
      return state.filter(b => b.id !== action.data);

    case 'COMMENT':
      return state.map(b => (b.id !== action.data.id ? b : action.data));

    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    });
  };
};

export const createBlog = draft => {
  return async dispatch => {
    const newBlog = await blogService.create(draft);
    dispatch({
      type: 'CREATE',
      data: newBlog,
    });
  };
};

export const like = (id, likedBlog) => {
  return async dispatch => {
    const blog = await blogService.like(id, likedBlog);
    dispatch({
      type: 'LIKE',
      data: blog,
    });
  };
};

export const remove = id => {
  return async dispatch => {
    await blogService.remove(id);
    dispatch({
      type: 'DELETE',
      data: id,
    });
  };
};

export const addComment = (id, draftComment) => {
  return async dispatch => {
    const comment = await commentService.postComment(id, draftComment);
    const commentedBlog = await blogService.getBlog(comment.blog);
    dispatch({
      type: 'COMMENT',
      data: commentedBlog,
    });
  };
};

export default blogReducer;
