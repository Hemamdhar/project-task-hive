
import React, { useState } from 'react';
import { useTaskContext } from '@/contexts/TaskContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { PlusSquare, Search, Filter } from 'lucide-react';
import TaskList from '@/components/TaskList';
import { Category } from '@/types';

const Tasks = () => {
  const { tasks, categories, filterTasks, activeFilters, setActiveFilters } = useTaskContext();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters(prev => ({ ...prev, [key]: value }));
  };
  
  // Apply filters and search
  const filteredTasks = filterTasks({
    ...activeFilters,
    search: searchQuery,
  });

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
          <p className="text-muted-foreground">Manage your tasks</p>
        </div>
        <Button onClick={() => navigate('/tasks/create')} className="flex items-center gap-2">
          <PlusSquare className="h-4 w-4" />
          <span>Create Task</span>
        </Button>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-2 justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="pl-9 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-white rounded-lg border animate-slide-in">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select 
                value={activeFilters.status || 'all'} 
                onValueChange={(value) => handleFilterChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select 
                value={activeFilters.priority || 'all'} 
                onValueChange={(value) => handleFilterChange('priority', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select 
                value={activeFilters.category || ''} 
                onValueChange={(value) => handleFilterChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg border p-4">
        <TaskList tasks={filteredTasks} />
      </div>
    </div>
  );
};

export default Tasks;
