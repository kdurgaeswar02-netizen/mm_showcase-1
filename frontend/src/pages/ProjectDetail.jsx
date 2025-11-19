import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, DollarSign, CheckSquare } from 'lucide-react';
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

    const { title, description, location, price, images, specs, youtubeUrl } = project;
    const challenge = project.challenge || "To create a modern, functional, and aesthetically pleasing living space that meets the client's unique needs and lifestyle.";
    const solution = project.solution || "Our team designed and executed a custom solution that maximized space, improved functionality, and incorporated the client's personal style. We used high-quality materials and innovative design techniques to deliver a truly exceptional result.";
    const outcomes = project.outcomes || [
        "Increased property value",
        "Enhanced functionality and livability",
        "A beautiful and modern living space",
        "Improved energy efficiency",
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
            {/* Hero Section */}
            <div className="bg-gray-900 text-white py-20 md:py-28">
                <div className="container mx-auto px-6 text-center">
                    <motion.h1 
                        initial={{ y: 50, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }} 
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-6xl font-bold font-display">
                        {title}
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mt-4">
                        {description}
                    </motion.p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16">
                {/* Image Gallery */}
                <motion.div 
                     initial={{ y: 50, opacity: 0 }} 
                     animate={{ y: 0, opacity: 1 }} 
                     transition={{ duration: 0.8 }}
                     className="mb-16">
                     {images && images.length > 0 ? (
                         <div className="relative shadow-2xl rounded-2xl overflow-hidden">
                            <motion.img 
                                key={currentImage}
                                src={images[currentImage]} 
                                alt={`Image ${currentImage + 1}`} 
                                className="w-full h-[300px] md:h-[550px] object-cover"
                                initial={{ opacity: 0.8, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                             <div className="absolute inset-0 flex justify-between items-center px-4 md:px-6">
                                <button onClick={prevImage} className="bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition-all"><ChevronLeft size={24}/></button>
                                <button onClick={nextImage} className="bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition-all"><ChevronRight size={24}/></button>
                            </div>
                         </div>
                      ) : (
                        <div className="text-center p-8 bg-gray-100 rounded-lg">No images available for this project.</div>
                      )}
                      {images && images.length > 1 && (
                          <div className="flex justify-center mt-6 space-x-3">
                            {images.map((img, index) => (
                                <img 
                                    key={index}
                                    src={img}
                                    alt={`thumbnail ${index}`}
                                    onClick={() => setCurrentImage(index)}
                                    className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg cursor-pointer border-4 transition-all duration-300 ${currentImage === index ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}
                                />
                            ))}
                        </div>
                      )}
                </motion.div>

                {/* Case Study Details */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column - Specs & Details */}
                    <motion.div 
                         initial={{ x: -50, opacity: 0 }} 
                         animate={{ x: 0, opacity: 1 }} 
                         transition={{ duration: 0.8, delay: 0.2 }}
                         className="lg:col-span-4 space-y-8">
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-2xl font-bold text-primary font-serif mb-4">Project Details</h3>
                            <div className="space-y-3 text-gray-700">
                                <div className="flex items-start">
                                    <MapPin className="w-5 h-5 mr-3 mt-1 text-primary flex-shrink-0" />
                                    <div><span className="font-semibold">Location:</span> {location || 'Not specified'}</div>
                                </div>
                                <div className="flex items-start">
                                    <DollarSign className="w-5 h-5 mr-3 mt-1 text-primary flex-shrink-0" />
                                    <div><span className="font-semibold">Price:</span> {price || 'Not specified'}</div>
                                </div>
                            </div>
                        </div>
                        {specs && Object.keys(specs).length > 0 && (
                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                 <h3 className="text-2xl font-bold text-primary font-serif mb-4">Specifications</h3>
                                 <ul className="space-y-3">
                                     {Object.entries(specs).map(([key, value]) => (
                                         <li key={key} className="flex justify-between border-b border-gray-200 pb-2 text-sm">
                                             <span className="font-semibold text-gray-700 capitalize">{key}</span>
                                             <span className="text-gray-600">{value}</span>
                                         </li>
                                     ))}
                                 </ul>
                            </div>
                        )}
                    </motion.div>

                    {/* Right Column - Challenge, Solution, Outcomes */}
                    <motion.div 
                         initial={{ x: 50, opacity: 0 }} 
                         animate={{ x: 0, opacity: 1 }} 
                         transition={{ duration: 0.8, delay: 0.4 }}
                        className="lg:col-span-8">
                        <div className="space-y-10">
                            <div>
                                <h2 className="text-3xl font-bold text-primary font-serif mb-4">The Challenge</h2>
                                <p className="text-gray-600 leading-relaxed text-lg">{challenge}</p>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-primary font-serif mb-4">The Solution</h2>
                                <p className="text-gray-600 leading-relaxed text-lg">{solution}</p>
                            </div>
                             <div>
                                <h2 className="text-3xl font-bold text-primary font-serif mb-4">Key Outcomes</h2>
                                <ul className="space-y-3">
                                    {outcomes.map((item, index) => (
                                        <li key={index} className="flex items-start">
                                            <CheckSquare className="w-6 h-6 mr-3 text-green-500 flex-shrink-0" />
                                            <span className="text-gray-700 text-lg">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* YouTube Walkthrough */}
            {youtubeUrl && (
                <motion.div initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.8, delay: 0.2}} className="bg-gray-50 py-16">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-primary font-serif mb-8 text-center">Virtual Walkthrough</h2>
                        <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-4xl border-4 border-white">
                            <iframe
                                src={youtubeUrl}
                                title="Project YouTube Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};
export default ProjectDetail;
