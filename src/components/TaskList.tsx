
import React from 'react';
import { Task, Category } from '@/types';
import { useTaskContext } from '@/contexts/TaskContext';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, Edit, Trash2, ChevronDown } from 'lucide-react';
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
import { isPast, isToday } from 'date-fns';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const { updateTask, deleteTask } = useTaskContext();
  const navigate = useNavigate();
  const [taskToDelete, setTaskToDelete] = React.useState<string | null>(null);

  const getStatusColor = (status: string) => {
    return status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800';
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

  const getCategoryColor = (category: Category | string) => {
    if (typeof category === 'string') {
      return 'bg-gray-100';
    }
    return `bg-${category.color}`;
  };

  const getDueDateStatus = (dueDate: string) => {
    const date = new Date(dueDate);
    if (isPast(date) && !isToday(date)) {
      return 'text-red-500';
    }
    if (isToday(date)) {
      return 'text-amber-500';
    }
    return 'text-gray-500';
  };

  const handleStatusChange = (id: string, checked: boolean) => {
    updateTask(id, { status: checked ? 'completed' : 'pending' });
  };

  const handleDelete = (id: string) => {
    setTaskToDelete(id);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete);
      setTaskToDelete(null);
    }
  };

  const cancelDelete = () => {
    setTaskToDelete(null);
  };

  const handleEdit = (id: string) => {
    navigate(`/tasks/${id}/edit`);
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No tasks found</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <Card
          key={task.id}
          className={cn(
            "p-4 border-l-4",
            task.status === 'completed' ? 'border-l-green-500 bg-green-50/50' : 'border-l-primary bg-white'
          )}
        >
          <div className="flex items-start gap-3">
            <Checkbox
              id={`task-${task.id}`}
              checked={task.status === 'completed'}
              onCheckedChange={(checked) => handleStatusChange(task.id, !!checked)}
              className="mt-1"
            />
            <div className="flex-1 min-w-0" onClick={() => navigate(`/tasks/${task.id}`)}>
              <div className="flex items-start justify-between gap-2">
                <h3
                  className={cn(
                    "font-medium text-lg line-clamp-1",
                    task.status === 'completed' && 'line-through text-muted-foreground'
                  )}
                >
                  {task.title}
                </h3>
                <div className="flex shrink-0 gap-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => handleEdit(task.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDelete(task.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              {task.description && (
                <p 
                  className={cn(
                    "text-sm text-muted-foreground mt-1 line-clamp-1",
                    task.status === 'completed' && 'line-through'
                  )}
                >
                  {task.description}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className={cn("text-xs", getDueDateStatus(task.dueDate.toString()))}>
                  {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  <Badge variant="outline" className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                  
                  {typeof task.category === 'object' && (
                    <Badge className={`bg-${task.category.color} hover:bg-${task.category.color}/80`}>
                      {task.category.name}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
      
      <AlertDialog open={!!taskToDelete} onOpenChange={cancelDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TaskList;
