import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import ProjectForm from '@/components/Admin/ProjectForm';

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const token = localStorage.getItem('token');

  const fetchProjects = async () => {
    // Add cache-busting parameter
    const response = await fetch(`/api/projects?_=${new Date().getTime()}`);
    const data = await response.json();
    setProjects(data);
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
      await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setProjects(projects.filter(p => p._id !== id));
    }
  };

  const handleFormSubmit = async (projectData) => {
    const formData = new FormData();
    if (projectData.image) {
      formData.append('image', projectData.image);
    }
    formData.append('title', projectData.title);
    formData.append('description', projectData.description);
    formData.append('location', projectData.location); // Added location
    formData.append('price', projectData.price);       // Added price
    
    const isUpdate = !!selectedProject;
    const url = isUpdate ? `/api/projects/${selectedProject._id}` : '/api/projects';
    const method = isUpdate ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method,
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData,
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || 'Failed to save project');
        }

        const savedProject = await response.json();

        if (isUpdate) {
            setProjects(projects.map(p => p._id === savedProject._id ? savedProject : p));
        } else {
            setProjects([savedProject, ...projects]);
        }

        setIsFormOpen(false);
        setSelectedProject(null);
    } catch (error) {
        console.error("Submission failed:", error);
        alert(`Error: ${error.message}`);
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
              {project.imageUrl && <img src={project.imageUrl} alt={project.title} className="rounded-t-lg w-full h-48 object-cover" />}
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {project.title}
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(project)} className="text-white"><Edit className="h-4 w-4" /></Button>
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
