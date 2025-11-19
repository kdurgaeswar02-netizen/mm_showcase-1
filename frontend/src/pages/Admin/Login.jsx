
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { User, Lock } from 'lucide-react';

const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
        username: 'admin',
        password: 'password'
    }
  });

  const handleLogin = async (values) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const { token } = await response.json();
      localStorage.setItem('token', token);
      navigate('/admin');
    } catch (error) {
      console.error('Login failed', error);
      form.setError("root", { type: "manual", message: "Invalid credentials" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' }  }
  };

  return (
    <div className="flex min-h-screen font-sans">
        <div className="hidden lg:flex w-1/2 bg-gray-100 items-center justify-center p-12">
            <motion.div 
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.8 }}
            >
                <img src="/logo.png" alt="M&M Interior Works" className="mx-auto h-28 w-auto mb-8"/>
                <h1 className="text-4xl font-bold text-black">Welcome to the Admin Panel</h1>
                <p className="mt-4 text-lg text-gray-600">Manage your projects, clients, and content with ease.</p>
            </motion.div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
            <motion.div 
                className="w-full max-w-md space-y-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className="text-center lg:hidden" variants={itemVariants}>
                    <img src="/logo.png" alt="M&M Interior Works" className="mx-auto h-20 w-auto"/>
                    <h1 className="mt-6 text-3xl font-bold text-black">Admin Panel</h1>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <h2 className="text-center text-2xl font-semibold text-gray-800">Sign in to your account</h2>
                </motion.div>

                <motion.div 
                    className="p-8 border border-gray-200 rounded-2xl shadow-xl"
                    variants={itemVariants}
                >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-600">Username</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                                    <Input placeholder="Enter your username" {...field} className="pl-10 bg-gray-50 border-gray-300 text-black focus:ring-black focus:border-black h-12 rounded-lg"/>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-600">Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                                    <Input type="password" placeholder="Enter your password" {...field} className="pl-10 bg-gray-50 border-gray-300 text-black focus:ring-black focus:border-black h-12 rounded-lg"/>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    {form.formState.errors.root && <FormMessage className="text-red-500 text-center">{form.formState.errors.root.message}</FormMessage>}
                    <Button type="submit" className="w-full bg-gradient-to-r from-gray-800 to-black text-white font-bold h-12 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                        Login
                    </Button>
                    </form>
                </Form>
                </motion.div>
                 <p className="text-center text-sm text-gray-500">© 2023 M&M Interior Works. All rights reserved.</p>
            </motion.div>
        </div>
    </div>
  );
};

export default Login;
