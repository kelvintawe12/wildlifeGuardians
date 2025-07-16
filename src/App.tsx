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
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import About from './pages/About';
import Contact from './pages/Contact';
import Help from './pages/Help';
// Components
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import OfflineIndicator from './components/OfflineIndicatorEnhanced';
import { PWAInstall } from './components/PWAInstall';
export function App() {
  return <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <OfflineIndicator />
        <PWAInstall />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Public pages */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          
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