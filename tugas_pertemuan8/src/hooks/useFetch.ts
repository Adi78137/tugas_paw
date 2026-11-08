import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseFetchResult<T> {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: () => void
}

export function useFetch<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  deps: unknown[] = [],
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const [retryTrigger, setRetryTrigger] = useState<number>(0)

  const fetcherRef = useRef(fetcher)
  fetcherRef.current = fetcher

  const refetch = useCallback(() => {
    setRetryTrigger((count) => count + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    setLoading(true)
    setError(null)

    fetcherRef
      .current(controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) {
          setData(result)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) {
          return
        }
        if (
          err instanceof Error &&
          (err.name === 'AbortError' || err.message.includes('aborted'))
        ) {
          return
        }
        setError(err instanceof Error ? err : new Error(String(err)))
        setLoading(false)
      })

    return () => {
      controller.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, retryTrigger])

  return { data, loading, error, refetch }
}

