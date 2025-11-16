import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import ModernNavbar from './components/ModernNavbar';
import Footer from './components/Footer';
import ModernFooter from './components/ModernFooter';

// Pages
import Home from './pages/Home';
import Showroom from './pages/Showroom';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import BookCall from './pages/BookCall';
import Reviews from './pages/Reviews';
import FAQ from './pages/FAQ';

// Admin Pages
import AdminLogin from './pages/Auth/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProjectsAdmin from './pages/Admin/ProjectsAdmin';
import ReviewsAdmin from './pages/Admin/ReviewsAdmin';
import FaqAdmin from './pages/Admin/FaqAdmin';
import SliderAdmin from './pages/Admin/SliderAdmin';

// CSS
import './styles/index.css';

function App() {
  return (
    <Router>
      <ModernNavbar />
      <main className="pt-20"> {/* Add padding-top to account for fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showroom" element={<Showroom />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/book-call" element={<BookCall />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/faq" element={<FAQ />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/projects" element={<ProjectsAdmin />} />
          <Route path="/admin/reviews" element={<ReviewsAdmin />} />
          <Route path="/admin/faq" element={<FaqAdmin />} />
          <Route path="/admin/slider" element={<SliderAdmin />} />
        </Routes>
      </main>
      <ModernFooter />
    </Router>
  );
}

export default App;
