import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud } from 'lucide-react';

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

const ProjectForm = ({ project, onSubmit, onCancel }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(project?.imageUrl || null);

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: project || { title: '', description: '' },
  });

  useEffect(() => {
    if (project) {
      form.reset(project);
      setImagePreview(project.imageUrl);
    }
  }, [project, form]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values) => {
    onSubmit({ ...values, image: imageFile });
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle>{project ? 'Edit Project' : 'Create New Project'}</CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-lg">Title</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Modern Kitchen Remodel" {...field} className="text-lg p-4"/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-lg">Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Describe the project details..." {...field} className="text-lg p-4" rows={5}/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormItem>
                        <FormLabel className="text-lg">Project Image</FormLabel>
                        <FormControl>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="h-full w-full object-cover rounded-lg"/>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <UploadCloud className="w-10 h-10 mb-4 text-gray-500" />
                                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                    )}
                                    <Input id="dropzone-file" type="file" className="hidden" onChange={handleImageChange} />
                                </label>
                            </div> 
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    <div className="flex justify-end space-x-4 pt-4">
                    <Button type="button" variant="outline" size="lg" onClick={onCancel}>Cancel</Button>
                    <Button type="submit" size="lg">{project ? 'Update Project' : 'Create Project'}</Button>
                    </div>
                </form>
            </Form>
        </CardContent>
    </Card>
  );
};

export default ProjectForm;
