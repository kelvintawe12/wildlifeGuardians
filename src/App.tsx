import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'sonner';
// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import QuizPage from './pages/QuizPage';
import AnimalInfo from './pages/AnimalInfo';
import Badges from './pages/Badges';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
// Components
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import OfflineIndicator from './components/OfflineIndicator';
export function App() {
  return <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <OfflineIndicator />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Layout />}>
            <Route path="/" element={<ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>} />
            <Route path="/quiz/:id" element={<ProtectedRoute>
                  <QuizPage />
                </ProtectedRoute>} />
            <Route path="/animal/:id" element={<ProtectedRoute>
                  <AnimalInfo />
                </ProtectedRoute>} />
            <Route path="/badges" element={<ProtectedRoute>
                  <Badges />
                </ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute>
                  <Settings />
                </ProtectedRoute>} />
          </Route>
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </AuthProvider>
    </Router>;
}