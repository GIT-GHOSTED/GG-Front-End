const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function request(path, options = {}) {
  const { headers: customHeaders = {}, ...restOptions } = options;

  // Normalize URL by removing duplicate slashes
  const url = `${API_BASE_URL}${path}`.replace(/([^:]\/)\/+/g, "$1");

  const response = await fetch(url, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...customHeaders,
    },
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "string"
        ? payload
        : payload?.error || payload?.message || "Request failed.";
    throw new Error(message);
  }

  return payload;
}

export const api = {
  register(email, password) {
    return request("/users/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  login(email, password) {
    return request("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  getApplications(token) {
    return request("/applications", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  getApplicationById(id, token) {
    return request(`/applications/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  createApplication(data, token) {
    return request("/applications", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  },

  updateApplication(id, data, token) {
    return request(`/applications/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  },

  deleteApplication(id, token) {
    return request(`/applications/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
