import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, X, CheckCircle, AlertCircle, Info, Clock, Calendar, Star, Users, FileText, MessageSquare, Award, TrendingUp, Filter, SortAsc } from "lucide-react";

interface Notification {
  id: number;
  type: "success" | "warning" | "info" | "default" | "interview" | "match" | "achievement" | "reminder";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority?: "high" | "medium" | "low";
}

interface NotificationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationSidebar = ({ isOpen, onClose }: NotificationSidebarProps) => {
  const [filterType, setFilterType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "interview",
      title: "Interview Invitation",
      message: "You've been invited for a virtual interview with Google for Product Manager Intern position. Interview scheduled for tomorrow at 2:00 PM.",
      timestamp: "30 minutes ago",
      read: false,
      priority: "high"
    },
    {
      id: 2,
      type: "match",
      title: "New Job Matches",
      message: "We found 5 new internship opportunities that match your profile. 3 are from top companies!",
      timestamp: "2 hours ago",
      read: false,
      priority: "medium"
    },
    {
      id: 3,
      type: "achievement",
      title: "Profile Completion",
      message: "Congratulations! Your profile is now 95% complete. This increases your visibility to recruiters by 40%.",
      timestamp: "1 day ago",
      read: false,
      priority: "low"
    },
    {
      id: 4,
      type: "success",
      title: "Application Submitted",
      message: "Your application for Product Manager Intern at Microsoft has been submitted successfully.",
      timestamp: "1 day ago",
      read: true,
      priority: "medium"
    },
    {
      id: 5,
      type: "reminder",
      title: "Deadline Reminder",
      message: "Don't forget! The application deadline for Amazon's Product Internship is in 2 days.",
      timestamp: "2 days ago",
      read: true,
      priority: "high"
    },
    {
      id: 6,
      type: "info",
      title: "Skill Assessment",
      message: "Complete your Product Management skill assessment to get better job recommendations.",
      timestamp: "3 days ago",
      read: true,
      priority: "low"
    },
    {
      id: 7,
      type: "success",
      title: "Resume Optimized",
      message: "Your resume has been automatically optimized with ATS-friendly keywords. View changes here.",
      timestamp: "4 days ago",
      read: true,
      priority: "medium"
    },
    {
      id: 8,
      type: "achievement",
      title: "First Application",
      message: "Great start! You've submitted your first application. Keep applying to increase your chances.",
      timestamp: "1 week ago",
      read: true,
      priority: "low"
    }
  ]);

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />;
      case "interview":
        return <Calendar className="h-4 w-4 text-purple-500" />;
      case "match":
        return <TrendingUp className="h-4 w-4 text-orange-500" />;
      case "achievement":
        return <Award className="h-4 w-4 text-yellow-600" />;
      case "reminder":
        return <Clock className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Filter and sort notifications
  const filteredNotifications = notifications
    .filter(notification => {
      if (filterType === "all") return true;
      if (filterType === "unread") return !notification.read;
      if (filterType === "high") return notification.priority === "high";
      return notification.type === filterType;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        // Sort by timestamp (newest first)
        const timeA = new Date(a.timestamp).getTime();
        const timeB = new Date(b.timestamp).getTime();
        return timeB - timeA;
      }
      if (sortBy === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const aPriority = priorityOrder[a.priority || "low"];
        const bPriority = priorityOrder[b.priority || "low"];
        return bPriority - aPriority;
      }
      return 0;
    });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onClose}>
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <div className="flex space-x-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs"
              >
                Mark all as read
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Filter and Sort Controls */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex space-x-2 mb-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="text-xs px-2 py-1 border rounded-md bg-white"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="high">High Priority</option>
              <option value="interview">Interviews</option>
              <option value="match">Job Matches</option>
              <option value="achievement">Achievements</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs px-2 py-1 border rounded-md bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="text-xs text-gray-500">
            {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        <ScrollArea className="h-[calc(100vh-160px)]">
          <div className="p-4 space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>No notifications found</p>
                <p className="text-xs mt-2">Try changing your filter settings</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    notification.read 
                      ? 'bg-gray-50 border-gray-200' 
                      : 'bg-blue-50 border-blue-200'
                  } ${
                    notification.priority === 'high' && !notification.read 
                      ? 'ring-2 ring-red-200 bg-red-50' 
                      : ''
                  }`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                          {notification.priority === 'high' && (
                            <Badge variant="destructive" className="text-xs px-1 py-0">
                              High
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-gray-500">
                            {notification.timestamp}
                          </p>
                          {notification.priority && (
                            <div className={`text-xs px-2 py-1 rounded-full ${
                              notification.priority === 'high' 
                                ? 'bg-red-100 text-red-700' 
                                : notification.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {notification.priority}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default NotificationSidebar;
