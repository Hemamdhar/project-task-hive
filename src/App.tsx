
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { TaskProvider } from "@/contexts/TaskContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/Layout";

// Pages
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Tasks from "@/pages/Tasks";
import CreateTask from "@/pages/CreateTask";
import EditTask from "@/pages/EditTask";
import TaskDetail from "@/pages/TaskDetail";
import Calendar from "@/pages/Calendar";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <TaskProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Tasks />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/tasks/create"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <CreateTask />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/tasks/:id"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <TaskDetail />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/tasks/:id/edit"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <EditTask />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/calendar"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Calendar />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Profile />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TaskProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
