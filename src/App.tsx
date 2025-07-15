import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';
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
// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOverview from './pages/admin/AdminOverview';
import UserManagement from './pages/admin/UserManagement';
import QuizManagement from './pages/admin/QuizManagement';
import Analytics from './pages/admin/Analytics';
import AdminSettings from './pages/admin/AdminSettings';
import AuditLogs from './pages/admin/AuditLogs';
import BadgeManagement from './pages/admin/BadgeManagement';
import ContentManagement from './pages/admin/ContentManagement';
import DatabaseManagement from './pages/admin/DatabaseManagement';
import SecurityCenter from './pages/admin/SecurityCenter';
// Components
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';
import Layout from './components/Layout';
import OfflineIndicator from './components/OfflineIndicator';
export function App() {
  return <Router>
      <AuthProvider>
        <AdminProvider>
          <Toaster position="top-right" />
          <OfflineIndicator />
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <AdminProtectedRoute>
                <AdminOverview />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/dashboard" element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <AdminProtectedRoute>
                <UserManagement />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/quizzes" element={
              <AdminProtectedRoute>
                <QuizManagement />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/analytics" element={
              <AdminProtectedRoute>
                <Analytics />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <AdminProtectedRoute>
                <AdminSettings />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/audit" element={
              <AdminProtectedRoute>
                <AuditLogs />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/badges" element={
              <AdminProtectedRoute>
                <BadgeManagement />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/content" element={
              <AdminProtectedRoute>
                <ContentManagement />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/database" element={
              <AdminProtectedRoute>
                <DatabaseManagement />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/security" element={
              <AdminProtectedRoute>
                <SecurityCenter />
              </AdminProtectedRoute>
            } />
            
            {/* Regular Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route element={<Layout />}>
              {/* Public pages */}
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/help" element={<Help />} />
              
              {/* Protected pages */}
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
        </AdminProvider>
      </AuthProvider>
    </Router>;
}