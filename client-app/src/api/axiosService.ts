import axios from 'axios'

const API_URL = 'http://localhost:3000/api';

const service = axios.create({
  baseURL: API_URL,
  timeout: 120000
})

service.interceptors.request.use(
  (config) => {
    if (config.headers) {
      // const token = localStorage.getItem('token')
      config.headers['Access-Control-Allow-Origin'] = '*'
      config.headers['Access-Control-Allow-Methods'] = 'GET, PUT, POST, DELETE, HEAD, OPTIONS'
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.defaults.withCredentials = true;

export default service
