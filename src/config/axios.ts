import _axios from 'axios';

const axios = _axios.create({
  baseURL: `https://deep-index.moralis.io/api/v2.2`,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': process.env.NEXT_PUBLIC_MORALIS_API_KEY,
  },
});

export default axios;
