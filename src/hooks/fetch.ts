import { useEffect, useState } from "react"

const useFetch = <T>(
  url: string,
): { isLoading: boolean; error: boolean; data: T[] } => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<T[]>([])
  const [error, setError] = useState(false)

  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url)
      if (response.ok) {
        const result = await response.json()
        const dataWithId = result.map((p: T, i: number) => ({
          ...p,
          id: i,
        }))
        setData([...dataWithId])
        setIsLoading(false)
      } else {
        setError(true)
        setIsLoading(false)
      }
    } catch (error) {
      setError(true)
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchData(url)
  }, [])
  return { isLoading, error, data }
}

export default useFetch
