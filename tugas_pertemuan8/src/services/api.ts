const BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'https://dummyjson.com'
).replace(/\/+$/, '')

export interface ApiFetchOptions extends RequestInit {
  signal?: AbortSignal
}

export async function apiFetch<T>(
  endpoint: string,
  options?: ApiFetchOptions | AbortSignal,
): Promise<T> {
  const init: RequestInit =
    options instanceof AbortSignal ? { signal: options } : options ?? {}

  const normalizedEndpoint = endpoint.startsWith('/')
    ? endpoint
    : `/${endpoint}`
  const url = `${BASE_URL}${normalizedEndpoint}`

  const response = await fetch(url, init)

  if (!response.ok) {
    let errorMessage = `Gagal memuat data (${response.status}: ${response.statusText})`
    try {
      const errorBody = await response.json()
      if (errorBody && typeof errorBody.message === 'string') {
        errorMessage = errorBody.message
      }
    } catch {
      // Abaikan jika respons bukan JSON
    }
    throw new Error(errorMessage)
  }

  return (await response.json()) as T
}

