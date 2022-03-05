import axios from 'axios';

const token = localStorage.getItem("token");

export default axios.create({
  baseURL: `https://jsonplaceholder.typicode.com/`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token
  },
});
