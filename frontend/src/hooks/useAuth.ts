import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../contexts/AuthContext"
import { loginUser, registerUser } from "../services/authService"

export const useAuthHooks = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (username: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await loginUser({ username, password })
      login({
        ...response.data,
        role: response.data.role,
      })
      navigate("/products")
      return true
    } catch (err: any) {
      setError(err.response?.data?.message || "Nome de usuário ou senha inválidos.")
      console.error("Error logging in:", err)
      return false
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (userData: any) => {
    setLoading(true)
    setError(null)
    try {
      await registerUser(userData)
      navigate("/login")
      return true
    } catch (err: any) {
      setError(err.response?.data?.message || "Ocorreu um erro ao registrar. Por favor, tente novamente.")
      console.error("Error registering:", err)
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    handleLogin,
    handleRegister,
  }
}
