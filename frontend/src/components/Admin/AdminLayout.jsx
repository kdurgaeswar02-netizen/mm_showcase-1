import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Star, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: Briefcase },
    { name: 'Reviews', path: '/admin/reviews', icon: Star },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-gray-900 text-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-700">
            <h1 className="text-3xl font-bold text-white">Admin</h1>
        </div>
        <nav className="flex-1 p-4">
          <ul>
            {navLinks.map((link) => (
                 <li key={link.name} className="mb-3">
                    <Link 
                        to={link.path} 
                        className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${ 
                            location.pathname === link.path 
                            ? 'bg-primary text-white' 
                            : 'hover:bg-gray-800'
                        }`}>
                        <link.icon size={20} className="mr-4"/>
                        <span className="font-medium">{link.name}</span>
                    </Link>
                 </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
            <button onClick={handleLogout} className="w-full flex items-center p-3 rounded-lg hover:bg-red-500 hover:text-white transition-colors duration-200">
                <LogOut size={20} className="mr-4"/>
                <span className="font-medium">Log Out</span>
            </button>
        </div>
      </aside>
      <main className="flex-1 p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
