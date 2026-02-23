import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import './App.css'

import ApplyCard from './pages/ApplyCard';

import Home from './components/Home/Home';
import ApproverDashboard from './components/Approver/ApproverDashboard';
import ApplicationStatus from './components/Status/ApplicationStatus';
import Login from './components/Login/Login';
import Navbar from './components/Navigation/Navbar';
import Footer from './components/Navigation/Footer';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#1976d2',
    },
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  }
});

const Layout = ({ children }) => {
  const location = useLocation();
  // Navbar (Applicant/Approver/Logout) should ONLY show on protected routes
  // i.e. NOT on Home (/), Login (/login)
  // Actually, Applicant page is public too? 
  // Let's say Navbar is only for "Approver" or after login.
  // For now, let's show the Internal Navbar only on /approver and /applicant (if accessed internally?)
  // But wait, user requirement for Home Page is specific header.
  // Let's hide the generic Navbar on Home and Login.

  // Show Internal Navbar only for specific routes if needed. 
  // In this app structure: 
  // Home -> Own Header
  // Login -> No Header
  // Applicant Form -> currently has no specific header requirement, maybe keep Internal Navbar if navigated from Login?
  // Actually in the flow: Home -> Applicant (Apply). 
  // So Applicant might be public.
  // Approver -> Internal.

  const showInternalNavbar = location.pathname === '/approver' || location.pathname === '/applicant';
  // Note: Applicant can be public, but usually "Internal Navbar" has "Logout".
  // If Applicant is public, it shouldn't have "Approver View" link.
  // Simplifying: Let's assume the Navbar we built earlier is for the "Dashboard" area.

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {showInternalNavbar && <Navbar />}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/applicant" element={<ApplyCard />} />
              <Route path="/approver" element={<ApproverDashboard />} />
              <Route path="/status" element={<ApplicationStatus />} />
              < Route path="*" element={< Navigate to="/" />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App