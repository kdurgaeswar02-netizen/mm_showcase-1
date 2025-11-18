import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, DollarSign } from 'lucide-react';
import API from '../api/api';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                setLoading(true);
                const response = await API.get(`/api/projects/${id}`);
                setProject(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch project details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
        if (project && project.images) {
            setCurrentImage((prev) => (prev + 1) % project.images.length);
        }
    };

    const prevImage = () => {
        if (project && project.images) {
            setCurrentImage((prev) => (prev - 1 + project.images.length) % project.images.length);
        }
    };

    if (loading) return <div className="text-center py-12">Loading...</div>;
    if (error) return <div className="text-center py-12 text-red-500">{error}</div>;
    if (!project) return <div className="text-center py-12">Project not found.</div>;

    const specs = project.specs || {};

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
            <div className="bg-gray-50 py-12 md:py-16">
                <div className="container mx-auto px-6">
                    <motion.h1 
                        initial={{ y: 50, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }} 
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-6xl font-bold text-primary font-display text-center p-4">
                        {project.title}
                    </motion.h1>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <motion.div 
                         initial={{ x: -50, opacity: 0 }} 
                         animate={{ x: 0, opacity: 1 }} 
                         transition={{ duration: 0.8 }}
                         className="lg:col-span-1 space-y-8 bg-white p-8 rounded-xl shadow-md border border-gray-100">
                        <div>
                            <h2 className="text-3xl font-bold text-primary font-serif mb-6">Project Brief</h2>
                            <div className="space-y-4 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <div className="flex items-center text-gray-800">
                                    <MapPin className="w-5 h-5 mr-3 text-primary" />
                                    <span className="font-semibold">Location:</span>
                                    <span className="ml-2">{project.location || 'Not specified'}</span>
                                </div>
                                <div className="flex items-center text-gray-800">
                                    <DollarSign className="w-5 h-5 mr-3 text-primary" />
                                    <span className="font-semibold">Price:</span>
                                    <span className="ml-2">{project.price || 'Not specified'}</span>
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed">{project.description}</p>
                        </div>
                        {Object.keys(specs).length > 0 && (
                            <div>
                                 <h3 className="text-2xl font-bold text-primary font-serif mb-4">Specifications</h3>
                                 <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                     <ul className="space-y-3">
                                         {Object.entries(specs).map(([key, value]) => (
                                             <li key={key} className="flex justify-between border-b border-gray-200 pb-2">
                                                 <span className="font-semibold text-gray-700 capitalize">{key}</span>
                                                 <span className="text-gray-600">{value}</span>
                                             </li>
                                         ))}
                                     </ul>
                                 </div>
                            </div>
                        )}
                    </motion.div>

                    <motion.div 
                         initial={{ x: 50, opacity: 0 }} 
                         animate={{ x: 0, opacity: 1 }} 
                         transition={{ duration: 0.8 }}
                        className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-primary font-serif mb-4">Image Gallery</h2>
                         {project.images && project.images.length > 0 ? (
                             <div className="relative">
                                <motion.img 
                                    key={currentImage}
                                    src={project.images[currentImage]} 
                                    alt={`Image ${currentImage + 1}`} 
                                    className="w-full h-[250px] md:h-[400px] object-cover rounded-xl shadow-2xl"
                                    initial={{ opacity: 0.8, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                />
                                 <div className="absolute inset-0 flex justify-between items-center px-4">
                                    <button onClick={prevImage} className="bg-white/70 p-2 rounded-full hover:bg-white transition-all"><ChevronLeft/></button>
                                    <button onClick={nextImage} className="bg-white/70 p-2 rounded-full hover:bg-white transition-all"><ChevronRight/></button>
                                </div>
                             </div>
                          ) : (
                            <p>No images available for this project.</p>
                          )}
                          {project.images && project.images.length > 1 && (
                              <div className="flex justify-center mt-4 space-x-2">
                                {project.images.map((img, index) => (
                                    <img 
                                        key={index}
                                        src={img}
                                        alt={`thumbnail ${index}`}
                                        onClick={() => setCurrentImage(index)}
                                        className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 transition-all ${currentImage === index ? 'border-primary' : 'border-transparent hover:border-secondary'}`}
                                    />
                                ))}
                            </div>
                          )}
                    </motion.div>
                </div>
            </div>

            {project.youtubeUrl && (
                <motion.div initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.8}} className="container mx-auto px-6 py-12">
                    <h2 className="text-3xl font-bold text-primary font-serif mb-6 text-center">Walkthrough</h2>
                    <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-2xl mx-auto max-w-2xl">
                        <iframe
                            src={project.youtubeUrl}
                            title="Project YouTube Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};
export default ProjectDetail;
