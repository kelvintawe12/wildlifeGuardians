import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CustomAuthProvider } from './contexts/CustomAuthContext';
import { Toaster } from 'sonner';
// Pages
import LoginCustom from './pages/LoginCustom';
import AdminLogin from './pages/admin/AdminLogin';
import AdminSignup from './pages/admin/AdminSignup';
import { AdminProvider } from './contexts/AdminContext';
import RegisterCustom from './pages/RegisterCustom';
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
import ProtectedRouteCustom from './components/ProtectedRouteCustom';
import Layout from './components/Layout';
import OfflineIndicator from './components/OfflineIndicatorEnhanced';
import { PWAInstall } from './components/PWAInstall';
import { ErrorBoundary } from './components/ErrorBoundary';
import ChatBot from './components/ChatBot';
export function App() {
  return (
    <ErrorBoundary>
      <CustomAuthProvider>
        <Router>
          <Toaster position="top-right" />
          <OfflineIndicator />
          <PWAInstall />
          <Routes>
            <Route path="/login" element={<LoginCustom />} />
            <Route path="/admin/login" element={
              <AdminProvider>
                <AdminLogin />
              </AdminProvider>
            } />
            <Route path="/admin/signup" element={
              <AdminProvider>
                <AdminSignup />
              </AdminProvider>
            } />
            <Route path="/register" element={<RegisterCustom />} />
            <Route element={
              <>
                <Layout />
                <ChatBot />
              </>
            }>
              {/* Public pages in layout */}
              <Route path="/" element={<ProtectedRouteCustom><Dashboard /></ProtectedRouteCustom>} />
              <Route path="/quiz/:id" element={<ProtectedRouteCustom><QuizPage /></ProtectedRouteCustom>} />
              <Route path="/animal/:id" element={<ProtectedRouteCustom><AnimalInfo /></ProtectedRouteCustom>} />
              <Route path="/badges" element={<ProtectedRouteCustom><Badges /></ProtectedRouteCustom>} />
              <Route path="/settings" element={<ProtectedRouteCustom><Settings /></ProtectedRouteCustom>} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/help" element={<Help />} />
            </Route>
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Router>
      </CustomAuthProvider>
    </ErrorBoundary>
  );
}