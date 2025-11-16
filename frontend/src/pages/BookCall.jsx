import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

const BookCall = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // null, 'sending', 'success', 'error'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // Placeholder for API call
    setTimeout(() => {
      // Simulate success/error
      if (form.name && form.phone) {
        setStatus('success');
        setForm({ name: '', phone: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <h1 className="text-5xl font-bold font-display text-center text-primary mb-4">Let's Connect</h1>
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12 font-serif">Schedule a free, no-obligation consultation with our design experts. Let's discuss how we can bring your vision to life.</p>
        </motion.div>

        <div className="bg-white max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 rounded-2xl shadow-2xl overflow-hidden">
          {/* Form Section */}
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Book Your Free Consultation</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="font-semibold text-gray-700">Full Name</label>
                <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition"/>
              </div>
              <div>
                <label htmlFor="phone" className="font-semibold text-gray-700">Phone Number</label>
                <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} required className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition"/>
              </div>
              <div>
                <label htmlFor="email" className="font-semibold text-gray-700">Email Address</label>
                <input type="email" id="email" name="email" value={form.email} onChange={handleChange} className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition"/>
              </div>
              <div>
                <label htmlFor="message" className="font-semibold text-gray-700">Tell us about your project (optional)</label>
                <textarea id="message" name="message" rows="4" value={form.message} onChange={handleChange} className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition"></textarea>
              </div>
              <div>
                <button type="submit" disabled={status === 'sending'} className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-300 disabled:bg-gray-400">
                  {status === 'sending' ? 'Requesting Call...' : 'Request a Call Back'}
                </button>
              </div>
            </form>
             {status === 'success' && <p className="mt-4 text-green-600 font-semibold">Thank you! We've received your request and will call you back shortly.</p>}
             {status === 'error' && <p className="mt-4 text-red-600 font-semibold">Something went wrong. Please check your details and try again.</p>}
          </div>

          {/* Contact Info Section */}
          <div className="bg-primary/5 p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-primary mb-6">Contact Information</h2>
            <p className="text-gray-600 mb-8">If you prefer, you can also reach out to us directly through the channels below. We're always happy to chat.</p>
            <div className="space-y-6">
              <a href="tel:+919876543210" className="flex items-center gap-4 text-lg text-gray-700 hover:text-primary transition-colors">
                <Phone size={24} className="text-primary" />
                <span>+91 987 654 3210</span>
              </a>
               <a href="mailto:hello@mminteriors.com" className="flex items-center gap-4 text-lg text-gray-700 hover:text-primary transition-colors">
                <Mail size={24} className="text-primary" />
                <span>hello@mminteriors.com</span>
              </a>
              <div className="flex items-start gap-4 text-lg text-gray-700">
                <MapPin size={40} className="text-primary mt-1" />
                <span>123, Modern Avenue,<br/>Vizag, Andhra Pradesh,<br/>India - 530013</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCall;
