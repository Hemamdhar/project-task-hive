
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  if (!user) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-foreground">User Not Found</h1>
        <p className="text-muted-foreground mt-2">Please log in to view your profile.</p>
        <Button className="mt-4" onClick={() => navigate('/login')}>
          Go to Login
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold text-foreground mb-6">Your Profile</h1>
      
      <Card className="max-w-md mx-auto">
        <CardHeader className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              {user.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-1">Account Information</h3>
            <p className="text-sm text-muted-foreground">
              This is a demo account. In a real application, you would be able to edit your profile, 
              change your password, and manage other account settings.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="destructive"
            className="flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span>Log Out</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
