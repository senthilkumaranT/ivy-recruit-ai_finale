import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Eye } from "lucide-react";

const ApplicationStatus = () => {
  const applications = [
    {
      id: 1,
      jobTitle: "Product Management Intern",
      company: "TechCorp Inc.",
      appliedDate: "2024-01-15",
      status: "Interview Completed",
      stage: "Final Review",
      progress: 90,
      statusColor: "warning",
      nextStep: "Decision expected by Jan 25",
      interviewScore: 8.5,
      feedback: "Strong analytical skills, good product sense"
    },
    {
      id: 2,
      jobTitle: "Associate Product Manager Intern",
      company: "StartupXYZ",
      appliedDate: "2024-01-12",
      status: "Accepted",
      stage: "Offer Extended",
      progress: 100,
      statusColor: "success",
      nextStep: "Respond to offer by Jan 20",
      interviewScore: 9.2,
      feedback: "Excellent communication and problem-solving abilities"
    },
    {
      id: 3,
      jobTitle: "Junior Product Analyst Intern",
      company: "MegaRetail Corp",
      appliedDate: "2024-01-18",
      status: "AI Interview",
      stage: "Initial Screening",
      progress: 30,
      statusColor: "default",
      nextStep: "Complete AI interview by Jan 22",
      interviewScore: null,
      feedback: null
    },
    {
      id: 4,
      jobTitle: "Product Intern",
      company: "FinanceFlow",
      appliedDate: "2024-01-10",
      status: "Rejected",
      stage: "Application Review",
      progress: 20,
      statusColor: "destructive",
      nextStep: "Application closed",
      interviewScore: 6.2,
      feedback: "Good potential but seeking candidates with more technical background"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Accepted":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "Rejected":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "Interview Completed":
        return <AlertCircle className="h-4 w-4 text-warning" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadgeVariant = (statusColor: string) => {
    switch (statusColor) {
      case "success":
        return "default";
      case "destructive":
        return "destructive";
      case "warning":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Application Status</h2>
        <div className="text-sm text-muted-foreground">
          {applications.length} applications submitted
        </div>
      </div>

      <div className="grid gap-6">
        {applications.map((app) => (
          <Card key={app.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{app.jobTitle}</CardTitle>
                  <p className="text-muted-foreground">{app.company}</p>
                </div>
                <Badge variant={getStatusBadgeVariant(app.statusColor)}>
                  {app.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Applied {new Date(app.appliedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(app.status)}
                    <span>{app.stage}</span>
                  </div>
                </div>
                {app.interviewScore && (
                  <div className="text-right">
                    <div className="text-lg font-semibold text-primary">
                      {app.interviewScore}/10
                    </div>
                    <div className="text-xs text-muted-foreground">Interview Score</div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Application Progress</span>
                  <span>{app.progress}%</span>
                </div>
                <Progress value={app.progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-sm font-medium">{app.nextStep}</p>
                  {app.feedback && (
                    <p className="text-sm text-muted-foreground mt-1">"{app.feedback}"</p>
                  )}
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {applications.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No applications yet</h3>
          <p className="text-muted-foreground">Start applying to jobs to track your application status here.</p>
        </div>
      )}
    </div>
  );
};

export default ApplicationStatus;