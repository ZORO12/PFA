import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Auth from './pages/Auth';
import Dashboard from './pages/adminDashboard';
import Feed from './pages/Feed';
import Profile from './components/Profile';
import ProtectedRoute from './routes/ProtectedRoute';
import CreateCompanyForm from './components/adminComponents/CreateCompanyForm';
// ── Ajout de l'import de ton nouveau Dashboard RH ────────────────────────────
import HrDashboard from './pages/HrDashboard'; 

function App() {
  return (
    <Routes>

      {/* PUBLIC ROUTE */}
      <Route path="/" element={<Auth />} />

      {/* ── ROUTE TEMPORAIRE POUR LE TEST RH ────────────────────────────────────
          On la laisse en dehors de <ProtectedRoute> pour que tu puisses la 
          tester instantanément sans te connecter ni créer de compte. */}
      <Route path="/hr/*" element={<HrDashboard />} />


      {/* PROTECTED ROUTES */}
      
      {/* Route Admin */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-company"
        element={
          <ProtectedRoute>
            <CreateCompanyForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/feed"
        element={
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;