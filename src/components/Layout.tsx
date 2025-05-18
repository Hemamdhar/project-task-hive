
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { LogOut, CalendarCheck, CheckSquare, ListTodo, PlusSquare, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <SidebarProvider collapsedWidth={56}>
      <div className="min-h-screen flex w-full bg-secondary/30">
        <Sidebar
          className={cn(
            "border-r border-border transition-all duration-300 ease-in-out",
            isMobile ? "w-[56px]" : "w-[250px]"
          )}
          collapsible
        >
          <SidebarContent className="flex flex-col h-full">
            <div className="px-3 py-2">
              <div className="flex items-center h-12 mb-6">
                {!isMobile && (
                  <h1 className="text-xl font-bold text-primary">TaskMaster</h1>
                )}
                {isMobile && (
                  <h1 className="text-xl font-bold text-primary">TM</h1>
                )}
                <SidebarTrigger className="ml-auto" />
              </div>
            </div>
            
            <SidebarGroup defaultOpen>
              <SidebarGroupLabel>Tasks</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to="/dashboard"
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md w-full",
                          isActive("/dashboard") ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                        )}
                      >
                        <ListTodo className="h-4 w-4" />
                        {!isMobile && <span>Dashboard</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to="/tasks"
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md w-full",
                          isActive("/tasks") ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                        )}
                      >
                        <CheckSquare className="h-4 w-4" />
                        {!isMobile && <span>All Tasks</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to="/tasks/create"
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md w-full",
                          isActive("/tasks/create") ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                        )}
                      >
                        <PlusSquare className="h-4 w-4" />
                        {!isMobile && <span>New Task</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to="/calendar"
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md w-full",
                          isActive("/calendar") ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                        )}
                      >
                        <CalendarCheck className="h-4 w-4" />
                        {!isMobile && <span>Calendar</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        to="/profile"
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md w-full",
                          isActive("/profile") ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                        )}
                      >
                        <User className="h-4 w-4" />
                        {!isMobile && <span>Profile</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <div className="mt-auto mb-4 px-3">
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2 justify-center"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                {!isMobile && <span>Logout</span>}
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
