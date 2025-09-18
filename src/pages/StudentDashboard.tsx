import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { User, Briefcase, FileText, MessageSquare, LogOut, Bell } from "lucide-react";
import Logo from "@/components/Logo";
import { Link, useNavigate } from "react-router-dom";
import StudentProfile from "@/components/StudentProfile";
import StudentJobs from "@/components/StudentJobs";
import ApplicationStatus from "@/components/ApplicationStatus";
import InterviewFeedback from "@/components/InterviewFeedback";
import NotificationSidebar from "@/components/NotificationSidebar";

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail") || "student@example.com";
  
  // Mock unread notification count
  const unreadCount = 2;

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const sidebarItems = [
    { id: "profile", title: "Profile", icon: User },
    { id: "jobs", title: "Jobs", icon: Briefcase },
    { id: "applications", title: "Application Status", icon: FileText },
    { id: "feedback", title: "Interview Feedback", icon: MessageSquare },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <StudentProfile />;
      case "jobs":
        return <StudentJobs />;
      case "applications":
        return <ApplicationStatus />;
      case "feedback":
        return <InterviewFeedback />;
      default:
        return <StudentProfile />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="w-64">
          <SidebarContent>
            <div className="p-4 border-b">
              <Logo size="sm" showText={false} />
              <p className="text-sm text-muted-foreground mt-1">Student Dashboard</p>
            </div>

            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setActiveSection(item.id)}
                        className={activeSection === item.id ? "bg-primary/10 text-primary" : ""}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="mt-auto p-4 border-t">
              <div className="space-y-2">
                <p className="text-sm font-medium">{userEmail}</p>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-6">
          <div className="mb-6">
            <SidebarTrigger className="mb-4" />
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Welcome back!</h1>
                <p className="text-muted-foreground">
                  Manage your profile and explore exciting internship opportunities
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative"
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {renderContent()}
        </main>
      </div>
      
      {/* Notification Sidebar */}
      <NotificationSidebar 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </SidebarProvider>
  );
};

export default StudentDashboard;