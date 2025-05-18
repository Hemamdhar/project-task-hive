
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Task, Category, DEFAULT_CATEGORIES } from '../types';
import { toast } from '../components/ui/use-toast';

interface TaskContextType {
  tasks: Task[];
  categories: Category[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
  filterTasks: (filters: TaskFilters) => Task[];
  activeFilters: TaskFilters;
  setActiveFilters: React.Dispatch<React.SetStateAction<TaskFilters>>;
}

export interface TaskFilters {
  category?: string;
  status?: 'completed' | 'pending' | 'all';
  priority?: 'low' | 'medium' | 'high' | 'all';
  search?: string;
}

const TaskContext = createContext<TaskContextType | null>(null);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

// Sample mock tasks
const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Finalize the project proposal for the client meeting',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
    category: DEFAULT_CATEGORIES[1], // Work
    status: 'pending',
    priority: 'high',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Buy groceries',
    description: 'Get milk, eggs, bread, and vegetables',
    dueDate: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
    category: DEFAULT_CATEGORIES[0], // Personal
    status: 'pending',
    priority: 'medium',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Pay rent',
    description: 'Transfer rent money to landlord',
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
    category: DEFAULT_CATEGORIES[2], // Urgent
    status: 'pending',
    priority: 'high',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Book dentist appointment',
    description: 'Call dentist to schedule a check-up',
    dueDate: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 days from now
    category: DEFAULT_CATEGORIES[0], // Personal
    status: 'completed',
    priority: 'low',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : MOCK_TASKS;
  });
  
  const [categories, setCategories] = useState<Category[]>(() => {
    const savedCategories = localStorage.getItem('categories');
    return savedCategories ? JSON.parse(savedCategories) : DEFAULT_CATEGORIES;
  });

  const [activeFilters, setActiveFilters] = useState<TaskFilters>({
    status: 'all',
    priority: 'all',
    search: '',
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    toast({
      title: "Task created",
      description: "Your task has been created successfully",
    });
  };

  const updateTask = (id: string, taskData: Partial<Task>) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id 
          ? { 
              ...task, 
              ...taskData, 
              updatedAt: new Date().toISOString() 
            } 
          : task
      )
    );
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully",
    });
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    toast({
      title: "Task deleted",
      description: "Your task has been deleted successfully",
    });
  };

  const getTaskById = (id: string) => {
    return tasks.find(task => task.id === id);
  };

  const filterTasks = (filters: TaskFilters) => {
    return tasks.filter(task => {
      // Filter by category
      if (filters.category && typeof task.category === 'object') {
        if (task.category.id !== filters.category) return false;
      }

      // Filter by status
      if (filters.status && filters.status !== 'all') {
        if (task.status !== filters.status) return false;
      }

      // Filter by priority
      if (filters.priority && filters.priority !== 'all') {
        if (task.priority !== filters.priority) return false;
      }

      // Filter by search term
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const titleMatch = task.title.toLowerCase().includes(searchTerm);
        const descMatch = task.description.toLowerCase().includes(searchTerm);
        if (!titleMatch && !descMatch) return false;
      }

      return true;
    });
  };

  const value = {
    tasks,
    categories,
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
    filterTasks,
    activeFilters,
    setActiveFilters,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
