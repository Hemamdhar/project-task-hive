
import React from 'react';
import { useTaskContext } from '@/contexts/TaskContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Category } from '@/types';
import { Edit, ArrowLeft, Trash2, Calendar } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const TaskDetail = () => {
  const { getTaskById, deleteTask } = useTaskContext();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  
  const task = id ? getTaskById(id) : undefined;
  
  if (!task) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-foreground">Task Not Found</h1>
        <p className="text-muted-foreground mt-2">The task you're looking for doesn't exist.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/tasks')}>
          Back to Tasks
        </Button>
      </div>
    );
  }

  const handleDelete = () => {
    if (!id) return;
    deleteTask(id);
    navigate('/tasks');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800';
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" onClick={() => navigate('/tasks')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Task Details</h1>
      </div>
      
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle className="text-2xl">{task.title}</CardTitle>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="outline" className={getStatusColor(task.status)}>
                {task.status === 'completed' ? 'Completed' : 'Pending'}
              </Badge>
              <Badge variant="outline" className={getPriorityColor(task.priority)}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
              </Badge>
              {typeof task.category === 'object' && (
                <Badge className={`bg-${task.category.color} hover:bg-${task.category.color}/80`}>
                  {task.category.name}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => navigate(`/tasks/${id}/edit`)}
            >
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </Button>
            <Button 
              variant="destructive" 
              className="flex items-center gap-2"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Due: {format(new Date(task.dueDate), 'PPP')}</span>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-muted-foreground whitespace-pre-line">
              {task.description || 'No description provided.'}
            </p>
          </div>
          
          <div className="border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p>{format(new Date(task.createdAt), 'PPP')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p>{format(new Date(task.updatedAt), 'PPP')}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline" onClick={() => navigate('/tasks')}>
            Back to Tasks
          </Button>
        </CardFooter>
      </Card>
      
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TaskDetail;
