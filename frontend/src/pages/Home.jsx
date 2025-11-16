import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Zap, Award, Shield } from 'lucide-react';

// Mock data - replace with API calls
const projects = [
  { _id: 1, title: 'Modern Kitchen', category: 'Kitchens', images: ['/placeholder-1.jpg'] },
  { _id: 2, title: 'Spacious Wardrobe', category: 'Wardrobes', images: ['/placeholder-2.jpg'] },
  { _id: 3, title: 'Office Partition', category: 'Partitions', images: ['/placeholder-3.jpg'] },
  { _id: 4, title: 'Living Room', category: 'Living', images: ['/placeholder-4.jpg'] },
  { _id: 5, title: 'Minimalist Bedroom', category: 'Bedroom', images: ['/placeholder-5.jpg'] },
];

const categories = [
  { name: 'Hall', image: '/category-1.jpg' },
  { name: 'Kitchen', image: '/category-2.jpg' },
  { name: 'TV Units', image: '/category-3.jpg' },
  { name: 'All kind of Aluminium Works', image: '/category-4.jpg' },
];

const features = [
    { icon: <Award className="w-10 h-10 text-primary"/>, title: 'Quality Craftsmanship', description: 'We use only the highest quality materials and our team of experts ensures a flawless finish.' },
    { icon: <Zap className="w-10 h-10 text-primary"/>, title: 'Innovative Designs', description: 'Our designs are modern, functional, and tailored to your unique style and needs.' },
    { icon: <Shield className="w-10 h-10 text-primary"/>, title: 'Durable & Long-lasting', description: 'Aluminum interiors are resistant to rust, corrosion, and pests, ensuring a long lifespan.' },
]

const Home = () => {

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="animate-fade-in bg-white text-gray-800">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-[90vh] flex items-center bg-cover bg-center bg-no-repeat relative"
        style={{backgroundImage: "url('/banner.jpg')"}}
      >
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="container mx-auto px-6 text-left z-10">
          <motion.h1 
            initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.2, duration: 0.5}}
            className="text-5xl md:text-7xl font-bold font-display text-white leading-tight mb-4 max-w-2xl">
            Designing Dreams, Building Reality
          </motion.h1>
          <motion.p 
            initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.4, duration: 0.5}}
            className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8 font-serif">
            Premium aluminum interiors for modern living. From bespoke kitchens to elegant office partitions, we bring your vision to life with precision and style.
          </motion.p>
          <motion.div 
            initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.6, duration: 0.5}}
            className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4">
            <Link to="/showroom">
              <button className="bg-primary text-white px-8 py-3 rounded-md font-semibold hover:scale-105 transition-transform duration-300 flex items-center gap-2 text-lg shadow-lg">
                Explore Showroom <ArrowRight size={20}/>
              </button>
            </Link>
            <Link to="/projects">
              <button className="bg-white/90 text-primary px-8 py-3 rounded-md font-semibold hover:scale-105 transition-transform duration-300 border border-transparent hover:bg-white text-lg shadow-lg">
                View Projects
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

       {/* Our Recent Work Section */}
       <motion.section 
        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
        className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                    <div>
                        <h2 className="text-4xl font-bold font-display text-primary">Our Recent Work</h2>
                        <p className="text-gray-600 mt-2 font-serif max-w-lg">A glimpse into the quality and craftsmanship we bring to every project. Each one a testament to our commitment to excellence.</p>
                    </div>
                    <Link to="/projects" className="mt-4 md:mt-0 flex-shrink-0">
                        <button className="bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-all duration-300 flex items-center gap-2 shadow-md">
                            View Full Portfolio <ArrowRight size={20}/>
                        </button>
                    </Link>
                </div>

                <div className="relative">
                    <div ref={scrollRef} className="flex overflow-x-auto gap-8 pb-8 scroll-smooth scrollbar-hide -mx-6 px-6">
                        {projects.map((project, i) => (
                            <motion.div 
                            key={project._id} 
                            initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{ once: true }} transition={{delay: i * 0.1, duration: 0.5}}
                            className="flex-shrink-0 w-[320px] bg-white rounded-lg shadow-xl overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300">
                                <Link to={`/projects/${project._id}`} >
                                    <div className="overflow-hidden h-60">
                                        <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-sm text-primary font-semibold">{project.category}</p>
                                        <h3 className="text-xl font-bold text-gray-800 font-serif mt-1">{project.title}</h3>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                    <button onClick={() => scroll('left')} className="hidden md:flex absolute top-1/2 -left-5 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all z-10 text-primary"><ChevronLeft size={24}/></button>
                    <button onClick={() => scroll('right')} className="hidden md:flex absolute top-1/2 -right-5 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all z-10 text-primary"><ChevronRight size={24}/></button>
                </div>
            </div>
      </motion.section>

       {/* Why Choose Us Section */}
       <motion.section 
        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
        className="py-20">
        <div className="container mx-auto px-6">
           <h2 className="text-4xl font-bold text-center mb-12 font-display text-primary">Why Choose M&M?</h2>
           <div className="grid md:grid-cols-3 gap-12 text-center">
               {features.map((feature, i) => (
                   <motion.div 
                    key={i} 
                    initial={{opacity: 0, y: 40}} whileInView={{opacity: 1, y: 0}} viewport={{ once: true }} transition={{delay: i * 0.2}}
                    className="border border-gray-200 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                       <div className="flex justify-center mb-4">
                        {feature.icon}
                       </div>
                       <h3 className="text-2xl font-bold font-display mb-2 text-gray-900">{feature.title}</h3>
                       <p className="text-gray-600 font-serif">{feature.description}</p>
                   </motion.div>
               ))}
           </div>
        </div>
       </motion.section>

      {/* Categories Section */}
      <motion.section 
        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
        className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 font-display text-primary">What We Do</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {categories.map((cat, i) => (
              <motion.div 
                key={cat.name}
                initial={{opacity: 0, scale: 0.9}} whileInView={{opacity: 1, scale: 1}} viewport={{ once: true }} transition={{delay: i * 0.1}}
                className="relative aspect-square md:aspect-[3/4] rounded-xl overflow-hidden group shadow-lg">
                 <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                 <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                    <h3 className="text-white text-xl md:text-2xl font-bold font-display">{cat.name}</h3>
                 </div>
                 <Link to="/showroom" className="absolute inset-0"/>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
       <motion.section 
        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="py-24 text-center bg-cover bg-center my-12"
        style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/cta-bg.jpg')"}}>
         <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-4 font-display text-white">Ready to start your project?</h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8 font-serif">
              Let's create a space that is not only beautiful but also functional. 
              Schedule a free consultation with our design experts today.
            </p>
            <Link to="/book-call">
              <button className="bg-primary text-white px-10 py-4 rounded-md font-semibold text-lg hover:scale-105 transition-transform duration-300 flex items-center gap-2 mx-auto shadow-xl">
                Book a Free Call <ArrowRight size={22}/>
              </button>
            </Link>
         </div>
      </motion.section>
    </div>
  );
};

export default Home;
