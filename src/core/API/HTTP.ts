import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios'
import { TOKEN_KEY } from 'src/constants/localStorage.constants'

export type TCustomAxiosError<T = any> = AxiosError<T> & {
  code: string | number
  message: string
  response?: AxiosResponse | null
  isAxiosError: boolean
  config?: {
    headers?: Record<string, string>
  }
  stack?: string
}

const responseInterceptors = {
  onFulfill: (response: { data: any }) => Promise.resolve(response.data),
  onReject: (error: TCustomAxiosError) => Promise.reject(error),
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

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
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
