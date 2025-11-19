import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLayout from './components/Admin/AdminLayout';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import Loading from './components/Loading';

// Lazy-loaded Pages
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const BookCall = lazy(() => import('./pages/BookCall'));
const Reviews = lazy(() => import('./pages/Reviews'));
const FAQ = lazy(() => import('./pages/FAQ'));
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Admin/Login'));

// Lazy-loaded Admin Pages
const AdminDashboard = lazy(() => import('./pages/Admin'));
const ProjectsAdmin = lazy(() => import('./pages/Admin/ProjectsAdmin'));
const ReviewsAdmin = lazy(() => import('./pages/Admin/ReviewsAdmin'));

// CSS
import './styles/index.css';

const App = () => {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

const MainContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/book-call" element={<BookCall />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin/login" element={<Login />} />

            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="projects" element={<ProjectsAdmin />} />
              <Route path="reviews" element={<ReviewsAdmin />} />
            </Route>
          </Routes>
        </Suspense>
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
