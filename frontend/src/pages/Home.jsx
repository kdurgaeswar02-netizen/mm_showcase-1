import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react'; // Using lucide-react for icons

// Dummy data - replace with API data later
const projects = [
  { _id: 1, title: 'Modern Kitchen', clientName: 'Mr. Sharma', images: ['/placeholder-1.jpg'] },
  { _id: 2, title: 'Living Room', clientName: 'Mrs. Gupta', images: ['/placeholder-2.jpg'] },
  { _id: 3, title: 'Office Space', clientName: 'ABC Corp', images: ['/placeholder-3.jpg'] },
  { _id: 4, title: 'Minimalist Bedroom', clientName: 'Mr. Khan', images: ['/placeholder-4.jpg'] },
];

const categories = [
  { name: 'Modular Kitchens', image: '/category-1.jpg' },
  { name: 'Wardrobes', image: '/category-2.jpg' },
  { name: 'Partitions', image: '/category-3.jpg' },
  { name: 'False Ceilings', image: '/category-4.jpg' },
];

const Home = () => {

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-accent/30 to-background relative overflow-hidden"
      >
        <div className="container mx-auto px-6 text-center z-10">
          <motion.h1 
            initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.2, duration: 0.5}}
            className="text-5xl md:text-7xl font-bold font-display text-primary leading-tight mb-4">
            Designing Dreams, Building Reality
          </motion.h1>
          <motion.p 
            initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.4, duration: 0.5}}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 font-serif">
            Premium aluminum interiors for modern living. From bespoke kitchens to elegant office partitions, we bring your vision to life with precision and style.
          </motion.p>
          <motion.div 
            initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.6, duration: 0.5}}
            className="flex justify-center gap-4">
            <Link to="/showroom">
              <button className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300 flex items-center gap-2">
                Explore Showroom <ArrowRight size={20}/>
              </button>
            </Link>
            <Link to="/projects">
              <button className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300 border border-secondary">
                View Projects
              </button>
            </Link>
          </motion.div>
        </div>
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl"></div>
      </motion.section>

      {/* Recent Projects Section */}
      <motion.section 
        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="py-16 container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Recent Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, i) => (
            <motion.div 
              key={project._id} 
              initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} transition={{delay: i * 0.1}}
              className="group relative overflow-hidden rounded-lg shadow-lg bg-white">
              <img src={project.images[0]} alt={project.title} className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"/>
              <div className="absolute inset-0 bg-black/50 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div>
                  <h3 className="text-white text-2xl font-bold font-serif">{project.title}</h3>
                  <p className="text-accent">{project.clientName}</p>
                </div>
              </div>
              <Link to={`/projects/${project._id}`} className="absolute inset-0"/>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
            <Link to="/projects">
                <button className="bg-transparent text-primary px-8 py-3 rounded-full font-semibold hover:bg-accent transition-all duration-300 border border-secondary flex items-center gap-2 mx-auto">
                    View All Projects <ArrowRight size={20}/>
                </button>
            </Link>
        </div>
      </motion.section>

      {/* Categories Section */}
      <motion.section 
        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="py-16 bg-accent/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">What We Do</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {categories.map((cat, i) => (
              <motion.div 
                key={cat.name}
                initial={{opacity: 0, scale: 0.9}} whileInView={{opacity: 1, scale: 1}} transition={{delay: i * 0.1}}
                className="relative aspect-[3/4] rounded-lg overflow-hidden group">
                 <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-white text-xl md:text-2xl font-bold font-display text-center p-2">{cat.name}</h3>
                 </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
       <motion.section 
        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="py-20 text-center container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-4">Ready to start your project?</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Let's create a space that is not only beautiful but also functional. 
          Schedule a free consultation with our design experts today.
        </p>
        <Link to="/book-call">
          <button className="bg-primary text-white px-10 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-300 flex items-center gap-2 mx-auto">
            Book a Free Call <ArrowRight size={22}/>
          </button>
        </Link>
      </motion.section>
    </div>
  );
};

export default Home;
