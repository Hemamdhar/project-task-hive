
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-white p-4">
      <div className="w-full max-w-4xl animate-fade-in text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">TaskMaster</h1>
        <p className="text-xl text-muted-foreground max-w-xl mx-auto">
          A powerful task management application to boost your productivity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12">
        <Card className="bg-white border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl">Organize</CardTitle>
            <CardDescription>Keep your tasks organized</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Create, edit, and organize tasks by categories with intuitive controls.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl">Prioritize</CardTitle>
            <CardDescription>Focus on what matters</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Set priorities and due dates to manage your time effectively.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl">Visualize</CardTitle>
            <CardDescription>Track your progress</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              View your tasks in a calendar and track completion with analytics.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" onClick={() => navigate('/login')} className="min-w-[150px]">
          Log In
        </Button>
        <Button size="lg" variant="outline" onClick={() => navigate('/register')} className="min-w-[150px]">
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Index;
