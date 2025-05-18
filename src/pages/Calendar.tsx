
import React, { useState } from 'react';
import { useTaskContext } from '@/contexts/TaskContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { PlusSquare, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, isSameDay, isEqual, addMonths, subMonths } from 'date-fns';
import { Task, Category } from '@/types';

const Calendar = () => {
  const { tasks } = useTaskContext();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  
  // Get tasks for the selected date
  const tasksForSelectedDate = selectedDate 
    ? tasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return isSameDay(taskDate, selectedDate);
      })
    : [];
  
  // Calculate days with tasks for the current month view
  const daysWithTasks = tasks.reduce<Record<string, number>>((acc, task) => {
    const dateKey = format(new Date(task.dueDate), 'yyyy-MM-dd');
    acc[dateKey] = (acc[dateKey] || 0) + 1;
    return acc;
  }, {});
  
  // Custom day rendering to show task indicators
  const dayRenderer = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const taskCount = daysWithTasks[dateKey] || 0;
    
    return (
      <div className="relative">
        <div>{date.getDate()}</div>
        {taskCount > 0 && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <Badge className="h-1.5 w-1.5 p-0 rounded-full bg-primary" />
          </div>
        )}
      </div>
    );
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
          <p className="text-muted-foreground">View and manage your tasks by date</p>
        </div>
        <Button onClick={() => navigate('/tasks/create')} className="flex items-center gap-2">
          <PlusSquare className="h-4 w-4" />
          <span>Create Task</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-4 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <CalendarComponent
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            className="rounded-md border p-3 pointer-events-auto"
            components={{ day: dayRenderer }}
          />
        </Card>

        <Card className="bg-white">
          <div className="p-4 border-b">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">
                {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'No date selected'}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {tasksForSelectedDate.length === 0 
                ? 'No tasks scheduled for this day' 
                : `${tasksForSelectedDate.length} task${tasksForSelectedDate.length !== 1 ? 's' : ''} scheduled`}
            </p>
          </div>
          
          <div className="p-4">
            {tasksForSelectedDate.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No tasks for the selected date</p>
                {selectedDate && (
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => navigate('/tasks/create')}
                  >
                    Add a task for this day
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {tasksForSelectedDate.map(task => (
                  <Card 
                    key={task.id} 
                    className="p-3 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/tasks/${task.id}`)}
                  >
                    <div className="flex items-start gap-2">
                      <div>
                        <h3 className="font-medium line-clamp-1">{task.title}</h3>
                        {task.description && (
                          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                            {task.description}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {typeof task.category === 'object' && (
                            <Badge className={`bg-${task.category.color} hover:bg-${task.category.color}/80`}>
                              {task.category.name}
                            </Badge>
                          )}
                          <Badge variant="outline" className={task.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
                            {task.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
