import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/users';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  // console.log(response.data) ;
  return response.data;
};

const create = async newDraft => {
  const response = await axios.post(baseUrl, newDraft);
  return response.data;
};

const remove = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default {
  getAll,
  create,
  remove,
};
