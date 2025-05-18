
import React from 'react';
import { useTaskContext } from '@/contexts/TaskContext';
import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from '@/components/TaskForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const EditTask = () => {
  const { getTaskById, updateTask, categories } = useTaskContext();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const task = id ? getTaskById(id) : undefined;
  
  if (!task) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-foreground">Task Not Found</h1>
        <p className="text-muted-foreground mt-2">The task you're looking for doesn't exist.</p>
      </div>
    );
  }

  const handleSubmit = (data: any) => {
    if (!id) return;
    
    // Find the category object based on the selected category id
    const selectedCategory = categories.find(cat => cat.id === data.category);
    
    updateTask(id, {
      ...data,
      category: selectedCategory,
    });
    
    navigate('/tasks');
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold text-foreground mb-6">Edit Task</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Edit Task</CardTitle>
          <CardDescription>Update your task details</CardDescription>
        </CardHeader>
        <CardContent>
          <TaskForm 
            initialData={task} 
            onSubmit={handleSubmit} 
            isEditing={true} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditTask;
