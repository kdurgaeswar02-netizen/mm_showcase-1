import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Dummy Data
const dummyProject = {
    _id: '1',
    title: 'Luxe Apartment in Mumbai',
    category: 'Residential',
    clientName: 'Mr. & Mrs. Sharma',
    city: 'Mumbai',
    status: 'Completed',
    description: 'A complete overhaul of a 3BHK apartment in a premium Mumbai high-rise. The design focuses on a light and airy feel, with custom furniture, smart home integration, and a neutral color palette accented with bold art pieces. The result is a space that is both luxurious and comfortable, perfect for modern city living.',
    images: ['/placeholder-5.jpg', '/placeholder-6.jpg', '/placeholder-7.jpg', '/placeholder-8.jpg'],
    specs: {
        area: '1500 sqft',
        timeline: '4 Months',
        budget: '₹50 Lakhs',
        scope: 'Full Interior Design, Custom Furniture, Smart Home Automation',
    },
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
};

const ProjectDetail = () => {
    const { id } = useParams();
    // Later: fetch project by id
    const project = dummyProject;

    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % project.images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + project.images.length) % project.images.length);
    };

    if (!project) return <div>Loading...</div>;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
            {/* Banner Section */}
            <div className="h-[60vh] md:h-[70vh] w-full relative overflow-hidden">
                <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <motion.h1 
                        initial={{ y: 50, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }} 
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-6xl font-bold text-white font-display text-center p-4">
                        {project.title}
                    </motion.h1>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Details */}
                    <motion.div 
                         initial={{ x: -50, opacity: 0 }} 
                         animate={{ x: 0, opacity: 1 }} 
                         transition={{ duration: 0.8 }}
                         className="lg:col-span-1 space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-primary font-serif mb-4">Project Brief</h2>
                            <p className="text-gray-600 leading-relaxed">{project.description}</p>
                        </div>
                        <div>
                             <h3 className="text-2xl font-bold text-primary font-serif mb-4">Specifications</h3>
                             <ul className="space-y-3">
                                 {Object.entries(project.specs).map(([key, value]) => (
                                     <li key={key} className="flex justify-between border-b pb-2">
                                         <span className="font-semibold text-gray-700 capitalize">{key}</span>
                                         <span className="text-gray-600">{value}</span>
                                     </li>
                                 ))}
                             </ul>
                        </div>
                    </motion.div>

                    {/* Right Column: Gallery */}
                    <motion.div 
                         initial={{ x: 50, opacity: 0 }} 
                         animate={{ x: 0, opacity: 1 }} 
                         transition={{ duration: 0.8 }}
                        className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-primary font-serif mb-4">Image Gallery</h2>
                         <div className="relative">
                            <motion.img 
                                key={currentImage}
                                src={project.images[currentImage]} 
                                alt={`Image ${currentImage + 1}`} 
                                className="w-full h-[400px] md:h-[600px] object-cover rounded-xl shadow-2xl"
                                initial={{ opacity: 0.8, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                             <div className="absolute inset-0 flex justify-between items-center px-4">
                                <button onClick={prevImage} className="bg-white/70 p-2 rounded-full hover:bg-white transition-all"><ChevronLeft/></button>
                                <button onClick={nextImage} className="bg-white/70 p-2 rounded-full hover:bg-white transition-all"><ChevronRight/></button>
                            </div>
                         </div>
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
                    </motion.div>
                </div>
            </div>

            {/* YouTube Video Section */}
            {project.youtubeUrl && (
                <motion.div initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.8}} className="container mx-auto px-6 py-12">
                    <h2 className="text-3xl font-bold text-primary font-serif mb-6 text-center">Walkthrough</h2>
                    <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-2xl mx-auto max-w-4xl">
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
