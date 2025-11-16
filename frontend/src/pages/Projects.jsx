import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const categories = ['All', 'Residential', 'Commercial', 'Hospitality'];

const Projects = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        setAllProjects(response.data);
        setFilteredProjects(response.data);
      } catch (err) {
        setError('Error fetching projects. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleFilter = (category) => {
    setActiveFilter(category);
    if (category === 'All') {
      setFilteredProjects(allProjects);
    } else {
      setFilteredProjects(allProjects.filter(p => p.category === category));
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading projects...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in">
      <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className="text-5xl font-bold font-display text-center text-primary mb-4">Our Portfolio</h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12 font-serif">A glimpse into the spaces we've transformed. Each project is a testament to our commitment to quality and aesthetic excellence.</p>
      </motion.div>

      <div className="flex justify-center space-x-2 md:space-x-4 mb-12">
        {categories.map(category => (
          <button 
            key={category} 
            onClick={() => handleFilter(category)} 
            className={`px-4 py-2 md:px-6 md:py-2.5 text-sm md:text-base font-semibold rounded-full transition-all duration-300 ${
                activeFilter === category 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-accent'
            }`}>
            {category}
          </button>
        ))}
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project._id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className="group relative overflow-hidden rounded-xl shadow-lg bg-white cursor-pointer">
              <img src={project.imageUrl} alt={project.name} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end">
                <motion.div 
                  initial={{ y: 20, opacity: 0}} 
                  className="transform group-hover:translate-y-0 group-hover:opacity-100 opacity-0 transition-all duration-500">
                  <h3 className="text-2xl font-bold text-white font-serif">{project.name}</h3>
                  <p className="text-accent text-sm">{project.description}</p>
                </motion.div>
                 <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-primary p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-xs font-bold">VIEW</div>
              </div>
              <Link to={`/projects/${project._id}`} className="absolute inset-0"/>
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
};

export default Projects;
