import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Star, ArrowRight } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 font-sans">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 font-serif">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <Card 
          className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 group"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-bold text-gray-900">Manage Projects</CardTitle>
            <Briefcase className="w-8 h-8 text-gray-800/50 group-hover:text-black transition-colors duration-300" />
          </CardHeader>
          <CardContent>
            <p className="text-gray-800/90 mb-6">Here you can add, edit, or delete projects from your portfolio.</p>
            <Link to="/admin/projects">
              <button className="bg-black/80 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-black transition-all duration-300 flex items-center gap-2">
                Go to Projects <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </CardContent>
        </Card>

        <Card 
          className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 group"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-bold text-gray-900">Manage Reviews</CardTitle>
            <Star className="w-8 h-8 text-gray-800/50 group-hover:text-black transition-colors duration-300" />
          </CardHeader>
          <CardContent>
            <p className="text-gray-800/90 mb-6">View and manage customer reviews and testimonials.</p>
            <Link to="/admin/reviews">
              <button className="bg-black/80 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-black transition-all duration-300 flex items-center gap-2">
                Go to Reviews <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </CardContent>
        </Card>
        
      </div>
    </div>
  );
};

export default AdminDashboard;
