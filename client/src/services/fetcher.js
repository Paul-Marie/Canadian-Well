const serverUrl = "http://127.0.0.1:3001";

const fetcher = (method) => (
  async (url, payload, type = "application/json;charset=UTF-8") => {
    const result = await fetch(`${serverUrl}${url}`, {
      method,
      headers: new Headers({
        "Content-Type": type,
      }),
      body: (payload !== undefined)
        ? type !== "application/json;charset=UTF-8"
        ? payload
        : JSON.stringify(payload)
      : undefined
    });
    if (result.ok === false || result.status === 204)
      return undefined;
    return result.json();
  });

export const get = fetcher("GET");
