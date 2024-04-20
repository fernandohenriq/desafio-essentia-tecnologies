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
    body: any
    query: Record<string, any>
    params: Record<string, any>
    headers: Record<string, any>
  }

  type httpResponse<T = unknown> = {
    status: (code: number) => httpResponse
    send: <T = unknown>(body: T) => void
  }

  type HttpNext = (err?: any) => void

  type HttpHandler = ((request: httpRequest, response: httpResponse) => Promise<void>) | ((request: httpRequest, response: httpResponse, next: HttpNext) => Promise<void>)
}
