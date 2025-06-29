import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import Categories from './pages/Categories';
import Leaderboard from './pages/Leaderboard';
import MarketCap from './pages/MarketCap';
import CreateAgent from './pages/CreateAgent';
import About from './pages/About';
import Contact from './pages/Contact';
import AgentDetails from './pages/AgentDetails';
import Settings from './pages/Settings';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <LoadingSpinner size="lg" text="Authenticating..." />
      </div>
    );
  }
  
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <LoadingSpinner size="xl" text="Initializing 9jaAgents..." />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/dashboard" /> : <Login />} 
            />
            <Route 
              path="/register" 
              element={user ? <Navigate to="/dashboard" /> : <Register />} 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } 
            />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/market-cap" element={<MarketCap />} />
            <Route path="/create-agent" element={<CreateAgent />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/agent/:id" element={<AgentDetails />} />
            
            {/* Placeholder routes for footer links */}
            <Route path="/privacy" element={<div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900"><h1 className="text-2xl text-slate-900 dark:text-white">Privacy Policy</h1></div>} />
            <Route path="/terms" element={<div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900"><h1 className="text-2xl text-slate-900 dark:text-white">Terms of Service</h1></div>} />
          </Routes>
        </main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--toast-bg)',
              color: 'var(--toast-color)',
              border: '1px solid var(--toast-border)',
            },
          }}
        />
      </div>
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;