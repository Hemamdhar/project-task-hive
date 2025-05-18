
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';
import { toast } from '../components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!user;

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, you would call your API here
      // This is a mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email and password match (this would be done server-side in a real app)
      if (email === 'user@example.com' && password === 'password') {
        const user: User = { id: '1', name: 'Demo User', email };
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        return true;
      }
      
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "An error occurred during login",
        variant: "destructive"
      });
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, you would call your API here
      // This is a mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = { id: Date.now().toString(), name, email };
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      toast({
        title: "Registration successful",
        description: "Your account has been created",
      });
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: "An error occurred during registration",
        variant: "destructive"
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
