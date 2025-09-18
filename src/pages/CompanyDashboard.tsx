import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Building, Briefcase, Users, Search, LogOut, CheckCircle, AlertCircle } from "lucide-react";
import Logo from "@/components/Logo";
import { useNavigate } from "react-router-dom";

const CompanyDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail") || "company@example.com";
  const [isVerified] = useState(true); // Mock verification status - now verified

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const sidebarItems = [
    { id: "overview", title: "Overview", icon: Building },
    { id: "jobs", title: "Job Postings", icon: Briefcase },
    { id: "candidates", title: "Candidates", icon: Users },
    { id: "matches", title: "AI Matches", icon: Search },
  ];

  const mockCandidates = [
    { id: 1, name: "John Doe", skills: "React, Python, PM", rating: "Excellent", match: 95 },
    { id: 2, name: "Jane Smith", skills: "Node.js, Angular, Agile", rating: "Good", match: 88 },
    { id: 3, name: "Mike Johnson", skills: "Vue.js, Django, Scrum", rating: "Excellent", match: 92 },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Active Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">3</div>
                  <p className="text-muted-foreground">Currently hiring</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success">24</div>
                  <p className="text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AI Matches</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-warning">12</div>
                  <p className="text-muted-foreground">Recommended candidates</p>
                </CardContent>
              </Card>
            </div>

            {!isVerified && (
              <Card className="border-warning bg-warning/5">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-warning" />
                    <CardTitle className="text-warning">Verification Required</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Your company profile needs verification before you can post jobs and access all features.
                  </p>
                  <Button variant="outline" className="border-warning text-warning hover:bg-warning hover:text-warning-foreground">
                    Start Verification Process
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        );
      
      case "candidates":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Candidates by Job</h2>
              <Button>Search Candidates</Button>
            </div>
            
            {/* Job: IA Engineer Internship */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>🤖 IA Engineer Internship</span>
                  <Badge>15 Applications</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground">TOP APPLICATIONS</h4>
                  {mockCandidates.map((candidate) => (
                    <Card key={candidate.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold">{candidate.name}</h3>
                            <p className="text-sm text-muted-foreground">{candidate.skills}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant={candidate.rating === "Excellent" ? "default" : "secondary"} className="text-xs">
                                {candidate.rating}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {candidate.match}% match
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">View Profile</Button>
                            <Button size="sm">Contact</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "jobs":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Job Postings</h2>
              <Button>+ Post New Job</Button>
            </div>
            <div className="grid gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">🤖 IA Engineer Internship</h3>
                      </div>
                      <p className="text-muted-foreground mb-3">
                        Join our AI team to work on cutting-edge machine learning projects and intelligent automation systems.
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>📍 San Francisco, CA</span>
                        <span>💰 $25-35/hr</span>
                        <span>⏰ Posted 2 days ago</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="default">Featured</Badge>
                        <Badge variant="secondary">15 Applications</Badge>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button size="sm">View Applications</Button>
                      <Button variant="outline" size="sm">Edit Job</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Feature Coming Soon</h2>
            <p className="text-muted-foreground">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="w-64">
          <SidebarContent>
            <div className="p-4 border-b">
              <Logo size="sm" showText={false} />
              <p className="text-sm text-muted-foreground mt-1">Company Dashboard</p>
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
                <div className="flex items-center space-x-2">
                  {isVerified ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-warning" />
                  )}
                  <span className="text-sm">
                    {isVerified ? "Verified" : "Pending Verification"}
                  </span>
                </div>
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
                <h1 className="text-3xl font-bold">Company Dashboard</h1>
                <p className="text-muted-foreground">
                  Manage your job postings and find the perfect candidates
                </p>
              </div>
            </div>
          </div>

          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CompanyDashboard;