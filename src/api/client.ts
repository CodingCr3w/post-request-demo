export type ClientOptions = RequestInit & {
  data?: unknown
}

export async function client(
  url: string,
  { data, headers: customHeaders, ...customConfig }: ClientOptions = {}
) {
  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      "Content-Type": "application/json",
      ...customHeaders
    },
    ...customConfig
  }

  return window.fetch(url, config).then(async (response) => {
    const data = await response.json()
    return response.ok ? data : Promise.reject(data)
  })
}
