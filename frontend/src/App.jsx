import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Showroom from './pages/Showroom';
import FAQ from './pages/FAQ';
import Reviews from './pages/Reviews';
import BookCall from './pages/BookCall';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ModernNavbar from './components/ModernNavbar';
import ModernFooter from './components/ModernFooter';

function App() {
  return (
    <Router>
      <div className="bg-background text-text min-h-screen flex flex-col font-sans">
        <ModernNavbar />
        <main className="flex-grow pt-20"> {/* Add padding top to avoid content being hidden by navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/showroom" element={<Showroom />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/book-call" element={<BookCall />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <ModernFooter />
      </div>
    </Router>
  );
}

export default App;
