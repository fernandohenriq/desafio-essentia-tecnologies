export global {
  type PropsOf<T> = {
    [K in keyof T as T[K] extends Function ? never : K]: T[K]
  }

  type PartialOf<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> &
  Partial<Pick<T, K>>

  type Where<T> = Partial<Record<keyof PropsOf<T>, any>> & Record<string, any>

  type Search<T> = {
    page?: number
    limit?: number
    sort?: 'asc' | 'desc'
    orderBy?: keyof PropsOf<T>
    where?: Partial<Record<keyof PropsOf<T>, any>> & Record<string, any>
  }

  type httpRequest<T = unknown> = {
    auth?: T
    body?: any
    query?: object
    params?: object
    headers?: object
  }

  type httpResponse<T = unknown> = {
    status: (code: number) => httpResponse
    send: <T = unknown>(body: T) => void
  }

  type HttpHandler = (request: httpRequest, response: httpResponse) => Promise<void>
}
