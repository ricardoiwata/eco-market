import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:5000/api", // URL do seu back-end
})

// Interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Clear localStorage on authentication errors
      localStorage.removeItem("token")
      localStorage.removeItem("user")

      // Redirect to login page
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Function to set auth token
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common["Authorization"]
  }
}

export default api
