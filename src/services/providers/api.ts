import { parseJSON } from "@/utils/parse"

const baseURL = import.meta.env.VITE_BASE_URL ?? ""

const headers = new Headers()
headers.set("Content-Type", "application/json")

const handleFetch = async <T>(fn: () => Promise<Response>): Promise<T> => {
  const response = await fn()
  const data = await response.json()

  if (typeof data === "object" && data && "error" in data) {
    if (data.error === "ConnectErr") {
      window.location.replace("/settings/dbproperties")
    }
    if (data.error === "RequestErr") {
      window.location.replace("/settings/dberror")
    }
  }

  return parseJSON(data) as T
}

const api = {
  async get<T>(url: string): Promise<T> {
    const result = await handleFetch<T>(() => fetch(`${baseURL}/api${url}`, { headers }))
    return result
  },
  async post<T, D>(url: string, data: D): Promise<T> {
    const result = await handleFetch<T>(() =>
      fetch(`${baseURL}/api${url}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers,
      }),
    )
    return result
  },
}

export default api
