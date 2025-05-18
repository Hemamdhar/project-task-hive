
import React from 'react';
import { useTaskContext } from '@/contexts/TaskContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { PlusSquare, CheckSquare, Clock, AlertTriangle } from 'lucide-react';
import { format, isPast, isToday, isTomorrow } from 'date-fns';
import TaskList from '@/components/TaskList';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  const { tasks, categories, filterTasks } = useTaskContext();
  const navigate = useNavigate();
  
  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  
  // Filter tasks by due date
  const todayTasks = tasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    return isToday(dueDate) && task.status !== 'completed';
  });

  const overdueTasks = tasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    return isPast(dueDate) && !isToday(dueDate) && task.status !== 'completed';
  });

  const upcomingTasks = tasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    return isTomorrow(dueDate) && task.status !== 'completed';
  });

  const highPriorityTasks = tasks.filter(task => 
    task.priority === 'high' && task.status !== 'completed'
  );

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Your task management overview</p>
        </div>
        <Button onClick={() => navigate('/tasks/create')} className="flex items-center gap-2">
          <PlusSquare className="h-4 w-4" />
          <span>Create Task</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalTasks}</div>
            <Progress value={100} className="h-1 mt-2" />
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completedTasks}</div>
            <Progress value={completionRate} className="h-1 mt-2 bg-muted" />
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingTasks}</div>
            <Progress value={(pendingTasks / totalTasks) * 100 || 0} className="h-1 mt-2 bg-muted" />
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completionRate}%</div>
            <Progress value={completionRate} className="h-1 mt-2 bg-muted" />
          </CardContent>
        </Card>
      </div>

      {/* Task Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's tasks */}
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <CardTitle>Today's Tasks</CardTitle>
            </div>
            <CardDescription>Tasks due today</CardDescription>
          </CardHeader>
          <CardContent>
            {todayTasks.length > 0 ? (
              <TaskList tasks={todayTasks.slice(0, 3)} />
            ) : (
              <p className="text-muted-foreground text-center py-4">No tasks due today</p>
            )}
            {todayTasks.length > 3 && (
              <Button variant="link" onClick={() => navigate('/tasks')} className="w-full mt-2">
                View all today's tasks
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Overdue tasks */}
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <CardTitle>Overdue Tasks</CardTitle>
            </div>
            <CardDescription>Tasks that are past their due date</CardDescription>
          </CardHeader>
          <CardContent>
            {overdueTasks.length > 0 ? (
              <TaskList tasks={overdueTasks.slice(0, 3)} />
            ) : (
              <p className="text-muted-foreground text-center py-4">No overdue tasks</p>
            )}
            {overdueTasks.length > 3 && (
              <Button variant="link" onClick={() => navigate('/tasks')} className="w-full mt-2">
                View all overdue tasks
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Upcoming tasks */}
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-green-500" />
              <CardTitle>Upcoming Tasks</CardTitle>
            </div>
            <CardDescription>Tasks due soon</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingTasks.length > 0 ? (
              <TaskList tasks={upcomingTasks.slice(0, 3)} />
            ) : (
              <p className="text-muted-foreground text-center py-4">No upcoming tasks</p>
            )}
            {upcomingTasks.length > 3 && (
              <Button variant="link" onClick={() => navigate('/tasks')} className="w-full mt-2">
                View all upcoming tasks
              </Button>
            )}
          </CardContent>
        </Card>

        {/* High Priority tasks */}
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <CardTitle>High Priority</CardTitle>
            </div>
            <CardDescription>Tasks that need immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            {highPriorityTasks.length > 0 ? (
              <TaskList tasks={highPriorityTasks.slice(0, 3)} />
            ) : (
              <p className="text-muted-foreground text-center py-4">No high priority tasks</p>
            )}
            {highPriorityTasks.length > 3 && (
              <Button variant="link" onClick={() => navigate('/tasks')} className="w-full mt-2">
                View all high priority tasks
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
