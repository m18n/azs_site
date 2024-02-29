const baseURL = import.meta.env.VITE_BASE_URL ?? ""

const api = {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(`${baseURL}/api${url}`)
    const data = await response.json()
    return data as T
  },
}

export default api
