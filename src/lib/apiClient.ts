export type ApiError = {
  status: number;
  message: string;
  issues?: unknown;
  logs?: unknown;
};

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

const parseResponse = async (response: Response) => {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
};

const request = async <T>(path: string, init: RequestInit = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    ...init,
  });

  const data = (await parseResponse(response)) as T;

  if (!response.ok) {
    const error: ApiError = {
      status: response.status,
      message: (data as unknown as ApiError)?.message ?? response.statusText,
      issues: (data as unknown as ApiError)?.issues,
      logs: (data as unknown as ApiError)?.logs,
    };
    throw error;
  }

  return data;
};

const requestForm = async <T>(
  path: string,
  body: FormData,
  method: "POST" | "PUT" = "POST",
  init: RequestInit = {},
) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    credentials: "include",
    body,
    ...init,
  });

  const data = (await parseResponse(response)) as T;

  if (!response.ok) {
    const error: ApiError = {
      status: response.status,
      message: (data as unknown as ApiError)?.message ?? response.statusText,
      issues: (data as unknown as ApiError)?.issues,
      logs: (data as unknown as ApiError)?.logs,
    };
    throw error;
  }

  return data;
};

export const apiClient = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body ?? {}) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body ?? {}) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
  upload: <T>(path: string, formData: FormData) => requestForm<T>(path, formData, "POST"),
  putForm: <T>(path: string, formData: FormData) => requestForm<T>(path, formData, "PUT"),
  baseUrl: API_BASE_URL,
};

export default apiClient;

