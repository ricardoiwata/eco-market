import { useState, useEffect } from "react"

import api from "../services/api"

export const useProducts = () => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await api.get("/products")
      setProducts(response.data)
      return response.data
    } catch (err) {
      console.error("Error fetching products:", err)
      setError("Não foi possível carregar os produtos. Por favor, tente novamente mais tarde.")
      return []
    } finally {
      setLoading(false)
    }
  }

  const fetchProductById = async (id: string) => {
    setLoading(true)
    try {
      const response = await api.get(`/products/${id}`)
      return response.data
    } catch (err) {
      console.error("Error fetching product:", err)
      setError("Não foi possível carregar o produto. Por favor, tente novamente mais tarde.")
      return null
    } finally {
      setLoading(false)
    }
  }

  const createProduct = async (productData: any) => {
    setLoading(true)
    try {
      const response = await api.post("/products", productData)
      return response.data
    } catch (err) {
      console.error("Error creating product:", err)
      setError("Não foi possível criar o produto. Por favor, tente novamente mais tarde.")
      return null
    } finally {
      setLoading(false)
    }
  }

  const updateProduct = async (id: string, productData: any) => {
    setLoading(true)
    try {
      const response = await api.put(`/products/${id}`, productData)
      return response.data
    } catch (err) {
      console.error("Error updating product:", err)
      setError("Não foi possível atualizar o produto. Por favor, tente novamente mais tarde.")
      return null
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id: string) => {
    setLoading(true)
    try {
      await api.delete(`/products/${id}`)
      setProducts(products.filter((product) => product._id !== id))
      return true
    } catch (err) {
      console.error("Error deleting product:", err)
      setError("Não foi possível excluir o produto. Por favor, tente novamente mais tarde.")
      return false
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
