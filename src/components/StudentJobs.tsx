import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, MapPin, Clock, DollarSign, Building, Users, Filter, X, Star, Briefcase, Calendar, Target } from "lucide-react";
import AIInterviewModal from "@/components/AIInterviewModal";

const StudentJobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showInterview, setShowInterview] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    jobType: "all",
    location: "all",
    salaryRange: [0, 10000],
    companySize: "all",
    experienceLevel: "all",
    workMode: "all",
    duration: "all",
    matchScore: [0, 100],
    skills: [] as string[],
    postedWithin: "all"
  });

  const mockJobs = [
    {
      id: 1,
      title: "Product Management Intern",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time Internship",
      duration: "3 months",
      salary: 4000,
      salaryDisplay: "$4,000/month",
      description: "Join our product team to work on cutting-edge consumer applications. You'll collaborate with engineers, designers, and stakeholders to drive product strategy and execution.",
      requirements: ["Currently pursuing Bachelor's or Master's degree", "Strong analytical skills", "Experience with Agile methodologies", "Knowledge of product management tools"],
      skills: ["Product Strategy", "Market Research", "Agile", "SQL"],
      posted: "2 days ago",
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      applicants: 45,
      match: 92,
      companySize: "large",
      experienceLevel: "entry",
      workMode: "hybrid",
      isRemote: false
    },
    {
      id: 2,
      title: "Associate Product Manager Intern",
      company: "StartupXYZ",
      location: "Remote",
      type: "Part-time Internship",
      duration: "6 months",
      salary: 3500,
      salaryDisplay: "$3,500/month",
      description: "Help us build innovative fintech solutions that democratize financial services. Work directly with our founding team on product roadmap and user research.",
      requirements: ["Junior/Senior year student", "Interest in fintech", "Strong communication skills", "Basic understanding of UX design"],
      skills: ["UX Research", "Wireframing", "Data Analysis", "Communication"],
      posted: "1 week ago",
      postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      applicants: 23,
      match: 88,
      companySize: "startup",
      experienceLevel: "entry",
      workMode: "remote",
      isRemote: true
    },
    {
      id: 3,
      title: "Junior Product Analyst Intern",
      company: "MegaRetail Corp",
      location: "New York, NY",
      type: "Full-time Internship",
      duration: "4 months",
      salary: 3800,
      salaryDisplay: "$3,800/month",
      description: "Analyze user behavior and market trends to inform product decisions for our e-commerce platform serving millions of customers worldwide.",
      requirements: ["Statistics or Business major preferred", "Excel/SQL proficiency", "Data visualization skills", "Retail/e-commerce interest"],
      skills: ["Data Analysis", "SQL", "Excel", "Tableau"],
      posted: "3 days ago",
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      applicants: 67,
      match: 78,
      companySize: "large",
      experienceLevel: "entry",
      workMode: "onsite",
      isRemote: false
    },
    {
      id: 4,
      title: "Product Marketing Intern",
      company: "GreenTech Solutions",
      location: "Austin, TX",
      type: "Full-time Internship",
      duration: "3 months",
      salary: 3200,
      salaryDisplay: "$3,200/month",
      description: "Support our product marketing team in developing go-to-market strategies for sustainable technology solutions.",
      requirements: ["Marketing or Business major", "Strong writing skills", "Social media experience", "Interest in sustainability"],
      skills: ["Marketing", "Content Creation", "Social Media", "Sustainability"],
      posted: "5 days ago",
      postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      applicants: 34,
      match: 85,
      companySize: "medium",
      experienceLevel: "entry",
      workMode: "hybrid",
      isRemote: false
    },
    {
      id: 5,
      title: "Senior Product Intern",
      company: "AI Innovations",
      location: "Seattle, WA",
      type: "Full-time Internship",
      duration: "6 months",
      salary: 5000,
      salaryDisplay: "$5,000/month",
      description: "Lead product initiatives for AI-powered applications. Work with senior product managers on strategic projects.",
      requirements: ["Graduate student or senior", "Previous product experience", "Technical background", "Leadership skills"],
      skills: ["AI/ML", "Product Strategy", "Leadership", "Technical Analysis"],
      posted: "1 day ago",
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      applicants: 89,
      match: 95,
      companySize: "medium",
      experienceLevel: "intermediate",
      workMode: "onsite",
      isRemote: false
    },
    {
      id: 6,
      title: "Product Design Intern",
      company: "DesignStudio Pro",
      location: "Remote",
      type: "Part-time Internship",
      duration: "4 months",
      salary: 2800,
      salaryDisplay: "$2,800/month",
      description: "Collaborate with design and product teams to create user-centered product experiences.",
      requirements: ["Design or HCI major", "Figma proficiency", "Portfolio required", "User research experience"],
      skills: ["UI/UX Design", "Figma", "User Research", "Prototyping"],
      posted: "4 days ago",
      postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      applicants: 56,
      match: 82,
      companySize: "small",
      experienceLevel: "entry",
      workMode: "remote",
      isRemote: true
    },
    {
      id: 7,
      title: "Product Operations Intern",
      company: "GlobalTech Corp",
      location: "Chicago, IL",
      type: "Full-time Internship",
      duration: "3 months",
      salary: 4200,
      salaryDisplay: "$4,200/month",
      description: "Support product operations and process optimization for our enterprise software platform.",
      requirements: ["Operations or Business major", "Process improvement experience", "Data analysis skills", "Project management knowledge"],
      skills: ["Operations", "Process Improvement", "Data Analysis", "Project Management"],
      posted: "6 days ago",
      postedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      applicants: 41,
      match: 79,
      companySize: "large",
      experienceLevel: "entry",
      workMode: "hybrid",
      isRemote: false
    },
    {
      id: 8,
      title: "Product Research Intern",
      company: "ResearchLabs Inc",
      location: "Boston, MA",
      type: "Part-time Internship",
      duration: "5 months",
      salary: 3000,
      salaryDisplay: "$3,000/month",
      description: "Conduct market research and competitive analysis to inform product decisions and strategy.",
      requirements: ["Research or Analytics major", "Statistical analysis skills", "Report writing ability", "Industry research interest"],
      skills: ["Market Research", "Statistical Analysis", "Report Writing", "Competitive Analysis"],
      posted: "1 week ago",
      postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      applicants: 28,
      match: 87,
      companySize: "medium",
      experienceLevel: "entry",
      workMode: "onsite",
      isRemote: false
    }
  ];

  // Get all unique skills for filter options
  const allSkills = Array.from(new Set(mockJobs.flatMap(job => job.skills))).sort();
  
  // Get all unique locations for filter options
  const allLocations = Array.from(new Set(mockJobs.map(job => job.location))).sort();

  const filteredJobs = mockJobs.filter(job => {
    // Search term filter
    const matchesSearch = searchTerm === "" || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    // Job type filter
    const matchesJobType = filters.jobType === "all" || 
      (filters.jobType === "full-time" && job.type.includes("Full-time")) ||
      (filters.jobType === "part-time" && job.type.includes("Part-time"));

    // Location filter
    const matchesLocation = filters.location === "all" || 
      job.location.toLowerCase().includes(filters.location.toLowerCase()) ||
      (filters.location === "remote" && job.isRemote);

    // Salary range filter
    const matchesSalary = job.salary >= filters.salaryRange[0] && job.salary <= filters.salaryRange[1];

    // Company size filter
    const matchesCompanySize = filters.companySize === "all" || job.companySize === filters.companySize;

    // Experience level filter
    const matchesExperience = filters.experienceLevel === "all" || job.experienceLevel === filters.experienceLevel;

    // Work mode filter
    const matchesWorkMode = filters.workMode === "all" || job.workMode === filters.workMode;

    // Duration filter
    const matchesDuration = filters.duration === "all" || 
      (filters.duration === "short" && job.duration.includes("3 months")) ||
      (filters.duration === "medium" && job.duration.includes("4 months")) ||
      (filters.duration === "long" && (job.duration.includes("5 months") || job.duration.includes("6 months")));

    // Match score filter
    const matchesMatchScore = job.match >= filters.matchScore[0] && job.match <= filters.matchScore[1];

    // Skills filter
    const matchesSkills = filters.skills.length === 0 || 
      filters.skills.some(skill => job.skills.includes(skill));

    // Posted within filter
    const now = new Date();
    const matchesPostedWithin = filters.postedWithin === "all" ||
      (filters.postedWithin === "today" && job.postedDate.toDateString() === now.toDateString()) ||
      (filters.postedWithin === "week" && (now.getTime() - job.postedDate.getTime()) <= 7 * 24 * 60 * 60 * 1000) ||
      (filters.postedWithin === "month" && (now.getTime() - job.postedDate.getTime()) <= 30 * 24 * 60 * 60 * 1000);

    return matchesSearch && matchesJobType && matchesLocation && matchesSalary && 
           matchesCompanySize && matchesExperience && matchesWorkMode && 
           matchesDuration && matchesMatchScore && matchesSkills && matchesPostedWithin;
  });

  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setFilters({
      jobType: "all",
      location: "all",
      salaryRange: [0, 10000],
      companySize: "all",
      experienceLevel: "all",
      workMode: "all",
      duration: "all",
      matchScore: [0, 100],
      skills: [],
      postedWithin: "all"
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== "all" && 
    !(Array.isArray(value) && (value[0] === 0 && value[1] === 10000 || value[0] === 0 && value[1] === 100)) &&
    !(Array.isArray(value) && value.length === 0)
  ).length;

  const handleApply = (job: any) => {
    setSelectedJob(job);
    setShowInterview(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Job Opportunities</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs, companies, skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="relative"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Filter Jobs</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Job Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Type</label>
              <Select value={filters.jobType} onValueChange={(value) => updateFilter('jobType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Select value={filters.location} onValueChange={(value) => updateFilter('location', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  {allLocations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Company Size Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Size</label>
              <Select value={filters.companySize} onValueChange={(value) => updateFilter('companySize', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  <SelectItem value="startup">Startup (1-50)</SelectItem>
                  <SelectItem value="small">Small (51-200)</SelectItem>
                  <SelectItem value="medium">Medium (201-1000)</SelectItem>
                  <SelectItem value="large">Large (1000+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Experience Level Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Experience Level</label>
              <Select value={filters.experienceLevel} onValueChange={(value) => updateFilter('experienceLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Work Mode Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Work Mode</label>
              <Select value={filters.workMode} onValueChange={(value) => updateFilter('workMode', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select work mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modes</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="onsite">On-site</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Duration Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Duration</label>
              <Select value={filters.duration} onValueChange={(value) => updateFilter('duration', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Durations</SelectItem>
                  <SelectItem value="short">Short (3 months)</SelectItem>
                  <SelectItem value="medium">Medium (4 months)</SelectItem>
                  <SelectItem value="long">Long (5-6 months)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Posted Within Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Posted Within</label>
              <Select value={filters.postedWithin} onValueChange={(value) => updateFilter('postedWithin', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Past Week</SelectItem>
                  <SelectItem value="month">Past Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Skills Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Skills</label>
              <div className="max-h-32 overflow-y-auto border rounded-md p-2">
                {allSkills.map(skill => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={filters.skills.includes(skill)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFilter('skills', [...filters.skills, skill]);
                        } else {
                          updateFilter('skills', filters.skills.filter(s => s !== skill));
                        }
                      }}
                    />
                    <label htmlFor={skill} className="text-sm">{skill}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Range Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Salary Range */}
            <div className="space-y-3">
              <label className="text-sm font-medium">
                Salary Range: ${filters.salaryRange[0]} - ${filters.salaryRange[1]}/month
              </label>
              <Slider
                value={filters.salaryRange}
                onValueChange={(value) => updateFilter('salaryRange', value)}
                max={10000}
                min={0}
                step={100}
                className="w-full"
              />
            </div>

            {/* Match Score Range */}
            <div className="space-y-3">
              <label className="text-sm font-medium">
                Match Score: {filters.matchScore[0]}% - {filters.matchScore[1]}%
              </label>
              <Slider
                value={filters.matchScore}
                onValueChange={(value) => updateFilter('matchScore', value)}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredJobs.length} of {mockJobs.length} jobs
          {activeFiltersCount > 0 && ` (${activeFiltersCount} filter${activeFiltersCount !== 1 ? 's' : ''} applied)`}
        </p>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear all filters
          </Button>
        )}
      </div>

      <div className="grid gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <Badge variant="secondary" className="bg-success/10 text-success">
                      {job.match}% match
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-muted-foreground mb-3">
                    <div className="flex items-center space-x-1">
                      <Building className="h-4 w-4" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{job.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4" />
                      <span>{job.salaryDisplay}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{job.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Posted {job.posted}</span>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{job.applicants} applicants</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">View Details</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{job.title}</DialogTitle>
                        <DialogDescription>{job.company} • {job.location}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Job Description</h4>
                          <p className="text-muted-foreground">{job.description}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Requirements</h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {job.requirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Key Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill) => (
                              <Badge key={skill} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-end pt-4">
                          <Button onClick={() => handleApply(job)}>Apply Now</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button onClick={() => handleApply(job)}>Apply</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No jobs found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms or check back later for new opportunities.</p>
        </div>
      )}

      <AIInterviewModal
        isOpen={showInterview}
        onOpenChange={setShowInterview}
        job={selectedJob}
      />
    </div>
  );
};

export default StudentJobs;