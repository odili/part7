import axios from 'axios';
const baseUrl = '/api/blogs';

const postComment = async (id, comment) => {
  const res = await axios.post(`${baseUrl}/${id}/comments`, comment);
  return res.data;
};

export default { postComment };
