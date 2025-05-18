
export type User = {
  id: string;
  name: string;
  email: string;
};

export type Category = {
  id: string;
  name: string;
  color: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: Date | string;
  category: Category | string;
  status: 'completed' | 'pending';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date | string;
  updatedAt: Date | string;
};

export const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Personal', color: 'task-personal' },
  { id: '2', name: 'Work', color: 'task-work' },
  { id: '3', name: 'Urgent', color: 'task-urgent' }
];
