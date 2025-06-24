import type React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import AdminDashboard from "./components/admin/AdminDashboard";
import AdminProductList from "./components/admin/AdminProductList";
import ProductForm from "./components/admin/ProductForm";
import UserManagement from "./components/admin/UserManagement";
import Login from "./components/Login";
import ProductDetail from "./components/ProductDetail";
import ProductList from "./components/ProductList";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <ProductList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/:id"
        element={
          <ProtectedRoute>
            <ProductDetail />
          </ProtectedRoute>
        }
      />

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute requireAdmin>
            <AdminProductList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products/new"
        element={
          <ProtectedRoute requireAdmin>
            <ProductForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products/edit/:id"
        element={
          <ProtectedRoute requireAdmin>
            <ProductForm editMode />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute requireAdmin>
            <UserManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/products" replace />} />
    </Routes>
  );
};

export default AppRoutes;
