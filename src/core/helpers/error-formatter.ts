import { TCustomAxiosError } from 'src/core/API/HTTP'

export const getFormattedError = (error: Record<string, unknown>) => {
  const {
    response = {
      status: 'Unknown Status',
      data: 'No data',
      headers: {},
      config: {},
    },
    message = 'No message',
    stack = '',
  } = error
  const { status, data, headers, config } = response ?? {}

  const formattedError: TCustomAxiosError = {
    code: status || 'Unknown Error',
    message,
    response: response
      ? {
          data,
          status,
          headers,
        }
      : null,
    isAxiosError: true,
    config,
    stack,
  }

  return formattedError
}
