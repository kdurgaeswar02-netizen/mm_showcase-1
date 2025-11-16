
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Mail, Lock } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
        email: 'admin@test.com',
        password: '123456'
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8">
        <div className="text-center">
            <img src="/logo.jpeg" alt="M&M Interior Works" className="mx-auto h-24 w-auto"/>
            <h1 className="mt-6 text-4xl font-extrabold text-white">Admin Panel</h1>
            <p className="mt-2 text-lg text-gray-400">Sign in to manage your projects</p>
        </div>
        <Card className="bg-gray-800 border-gray-700 shadow-2xl shadow-primary/20">
            <CardContent className="p-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-gray-300">Email</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                                <Input type="email" placeholder="admin@example.com" {...field} className="pl-10 bg-gray-700 border-gray-600 text-white focus:ring-primary focus:border-primary h-12"/>
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
                        <FormLabel className="text-gray-300">Password</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                                <Input type="password" placeholder="********" {...field} className="pl-10 bg-gray-700 border-gray-600 text-white focus:ring-primary focus:border-primary h-12"/>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                {form.formState.errors.root && <FormMessage>{form.formState.errors.root.message}</FormMessage>}
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 text-lg transition-all duration-300 transform hover:scale-105">
                    Login
                </Button>
                </form>
            </Form>
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;