import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import ProjectForm from '@/components/Admin/ProjectForm';


import API from '../../api/api'; 

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await API.get('/api/projects'); 
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAdd = () => {
    setSelectedProject(null);
    setIsFormOpen(true);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setIsFormOpen(true);
  };
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await API.delete(`/api/projects/${id}`);
        setProjects(projects.filter(p => p._id !== id));
      } catch (error) {
        console.error("Delete failed", error);
        alert("Failed to delete project");
      }
    }
  };

  const handleFormSubmit = async (projectData) => {
    const formData = new FormData();
    
    formData.append('title', projectData.title);
    formData.append('description', projectData.description);
    formData.append('location', projectData.location);
    formData.append('price', projectData.price);
    
    if (projectData.image && typeof projectData.image !== 'string') {
      formData.append('image', projectData.image);
    }
    
    const isUpdate = !!selectedProject;
    const url = isUpdate ? `/api/projects/${selectedProject._id}` : '/api/projects';
    
    try {
        let response;
        if (isUpdate) {
            // For PUT requests with files
            response = await API.put(url, formData);
        } else {
            // For POST requests with files
            response = await API.post(url, formData);
        }

        const savedProject = response.data;

        if (isUpdate) {
            setProjects(projects.map(p => p._id === savedProject._id ? savedProject : p));
        } else {
            setProjects([savedProject, ...projects]);
        }

        setIsFormOpen(false);
        setSelectedProject(null);
    } catch (error) {
        console.error("Submission failed:", error);
        alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <Button onClick={handleAdd}><PlusCircle className="h-4 w-4 mr-2" /> Add Project</Button>
      </div>

      {isFormOpen ? (
        <ProjectForm project={selectedProject} onSubmit={handleFormSubmit} onCancel={() => setIsFormOpen(false)} />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map(project => (
            <Card key={project._id}>
              {/* Handle diverse image formats (Cloudinary URL vs Local) */}
              {project.images && project.images.length > 0 && (
                 <img src={project.images[0]} alt={project.title} className="rounded-t-lg w-full h-48 object-cover" />
              )}
              
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {project.title}
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(project)} className="text-black border-gray-300"><Edit className="h-4 w-4" /></Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(project._id)} className="text-white"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-2">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsAdmin;
