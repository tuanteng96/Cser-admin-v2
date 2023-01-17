import axios from 'axios'
import queryString from 'query-string'

const http = axios.create({
  baseURL: window.top.DOMAIN
    ? window.top.DOMAIN
    : process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'text/plain'
  },
  paramsSerializer: params => queryString.stringify(params)
})

export default http
