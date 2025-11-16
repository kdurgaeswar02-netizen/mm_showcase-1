import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Star, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-bold">Manage Projects</CardTitle>
            <Briefcase className="w-6 h-6 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Here you can add, edit, or delete projects from your portfolio.</p>
            <Link to="/admin/projects" className="text-primary font-semibold hover:underline flex items-center">
              Go to Projects <PlusCircle className="w-4 h-4 ml-2" />
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-bold">Manage Reviews</CardTitle>
            <Star className="w-6 h-6 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">View and manage customer reviews and testimonials.</p>
            <Link to="/admin/reviews" className="text-primary font-semibold hover:underline flex items-center">
              Go to Reviews <PlusCircle className="w-4 h-4 ml-2" />
            </Link>
          </CardContent>
        </Card>
        
      </div>

      <div className="mt-12 bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Instructions</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Use the <span className='font-bold'>Projects</span> section to showcase your best work. High-quality images are recommended.</li>
          <li>The <span className='font-bold'>Reviews</span> section helps build trust with potential clients. Make sure to keep it updated.</li>
          <li>To add a new project, navigate to the Projects page and click on the 'Add New Project' button.</li>
          <li>To edit or delete an existing project, use the respective buttons on the project list.</li>
        </ul>
      </div>

    </div>
  );
};

export default AdminDashboard;
