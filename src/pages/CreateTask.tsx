
import React from 'react';
import { useTaskContext } from '@/contexts/TaskContext';
import { useNavigate } from 'react-router-dom';
import TaskForm from '@/components/TaskForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CreateTask = () => {
  const { addTask, categories } = useTaskContext();
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    // Find the category object based on the selected category id
    const selectedCategory = categories.find(cat => cat.id === data.category);
    
    addTask({
      ...data,
      category: selectedCategory,
    });
    
    navigate('/tasks');
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold text-foreground mb-6">Create Task</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>New Task</CardTitle>
          <CardDescription>Add a new task to your list</CardDescription>
        </CardHeader>
        <CardContent>
          <TaskForm onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTask;
