import axios, { AxiosInstance } from 'axios'
import { TOKEN_KEY } from 'src/constants/localStorage.constants'

const responseInterceptors = {
  onFulfill: (response: any) => Promise.resolve(response.data),
  onReject: (error: any) => Promise.reject(error),
}

const requestInterceptors = {
  onFulfill: (config: any) => {
    const localStorageToken = localStorage.getItem(TOKEN_KEY)
    if (localStorageToken && config.url !== '/auth/token/refresh/') {
      config.headers.Authorization = `Bearer ${localStorageToken}`
    }

    return config
  },
}
// TODO: Change it to .env variable
const instance: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
})

instance.interceptors.response.use(
  responseInterceptors.onFulfill,
  responseInterceptors.onReject
)
instance.interceptors.request.use(requestInterceptors.onFulfill)

export default instance
