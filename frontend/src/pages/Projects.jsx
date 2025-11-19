import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../api/api';

const categories = ['All', 'Hall', 'Kitchen', 'TV Units', 'All kind of Aluminium Works'];

const Projects = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await API.get('/api/projects');
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
    return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
  }

  if (error) {
    return (
        <div className="text-center p-8 text-red-500 h-screen">
          <p className="text-2xl font-bold mb-4">Oops! Something went wrong.</p>
          <p>{error}</p>
        </div>
      );
  }

  return (
    <div className="animate-fade-in bg-gray-50">
       {/* Hero Section */}
       <motion.section 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
        className="bg-cover bg-center py-16 md:py-24 relative"
        style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/cta-bg.jpg')"}}>
            <div className="container mx-auto px-6 text-center z-10 relative">
                <motion.h1 
                    initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.2, duration: 0.5}}
                    className="text-4xl md:text-6xl font-bold font-display text-white leading-tight mb-4">
                    Our Portfolio
                </motion.h1>
                <motion.p 
                    initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.4, duration: 0.5}}
                    className="text-base md:text-lg text-gray-200 max-w-3xl mx-auto font-serif">
                    A glimpse into the spaces we've transformed. Each project is a testament to our commitment to quality and aesthetic excellence.
                </motion.p>
            </div>
      </motion.section>

      <div className="container mx-auto px-6 py-16">
        {/* Filter Buttons */}
        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
            {categories.map(category => (
            <button 
                key={category} 
                onClick={() => handleFilter(category)} 
                className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 shadow-sm ${
                    activeFilter === category 
                    ? 'bg-primary text-white scale-105' 
                    : 'bg-white text-gray-700 hover:bg-gray-200'
                }`}>
                {category}
            </button>
            ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{ perspective: '1000px' }}>
            {filteredProjects.map((project) => (
                <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                whileHover={{ y: -10, rotateX: 5, rotateY: 2, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transform transition-transform duration-300">
                    <Link to={`/projects/${project._id}`} >
                        <img src={project.images[0]} alt={project.title} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"/>
                        <div className="absolute bottom-0 left-0 p-6 w-full">
                             <p className="text-xs uppercase tracking-widest font-semibold text-white mb-2 drop-shadow-md">{project.category}</p>
                             <h3 className="text-2xl font-bold text-white font-display drop-shadow-lg">{project.title}</h3>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Ready to Start Your Project?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">Let us help you create a space that reflects your vision and lifestyle. Contact us today for a free consultation.</p>
          <Link to="/contact" className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-colors duration-300">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Projects;
