import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Download, Edit, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Passionate about product management and technology. Looking for internship opportunities to apply my skills and learn from industry experts.",
    skills: "Product Strategy, Market Research, Agile, Figma, SQL",
    education: "Bachelor of Business Administration, Stanford University",
    experience: "Product Management Intern at TechCorp (Summer 2023)"
  });
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  // Check if resume is uploaded on component mount
  useEffect(() => {
    const savedResume = localStorage.getItem('resumeFile');
    setResumeUploaded(!!savedResume);
  }, []);


  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleUpdateResume = () => {
    const input = document.getElementById('resume-upload-update') as HTMLInputElement;
    if (input) {
      input.click();
    }
  };

  const handleInitialUpload = () => {
    const input = document.getElementById('resume-upload') as HTMLInputElement;
    if (input) {
      input.click();
    }
  };

  const handleResumeDownload = () => {
    const savedResume = localStorage.getItem('resumeFile');
    if (savedResume) {
      try {
        const fileData = JSON.parse(savedResume);
        
        if (fileData.data) {
          // Convert base64 back to blob
          const byteCharacters = atob(fileData.data.split(',')[1]);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: fileData.type });
          
          // Create download link
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = fileData.name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Clean up the URL object
          window.URL.revokeObjectURL(url);
          
          toast({
            title: "Resume Downloaded",
            description: `"${fileData.name}" has been downloaded.`,
          });
        } else {
          toast({
            title: "Download Failed",
            description: "File data not found. Please upload your resume again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error downloading resume:', error);
        toast({
          title: "Download Failed",
          description: "There was an error downloading your resume.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "No Resume Found",
        description: "Please upload a resume first.",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File upload handler triggered', event.target.files);
    const file = event.target.files?.[0];
    
    if (!file) {
      console.log('No file selected');
      toast({
        title: "No File Selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    // Reset the input value to allow re-uploading the same file
    event.target.value = '';

    console.log('File selected:', file.name, file.type, file.size);
    setSelectedFile(file);
    setIsUploading(true);
    
    try {
      // File type validation
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: `File type "${file.type}" is not supported. Please upload a PDF, DOC, or DOCX file.`,
          variant: "destructive",
        });
        setIsUploading(false);
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive",
        });
        setIsUploading(false);
        return;
      }

      // Convert file to base64 for storage
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        
        if (!base64String) {
          setIsUploading(false);
          toast({
            title: "Upload Failed",
            description: "Failed to read file data. Please try again.",
            variant: "destructive",
          });
          return;
        }
        
        // Save file data to localStorage
        const fileData = {
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
          uploadDate: new Date().toISOString(),
          data: base64String // Store the actual file data
        };

        localStorage.setItem('resumeFile', JSON.stringify(fileData));
        setResumeUploaded(true);
        setIsUploading(false);

        // Update profile with dummy data when resume is uploaded
        setProfile({
          fullName: "Sarah Johnson",
          email: "sarah.johnson@email.com",
          phone: "+1 (555) 987-6543",
          location: "Austin, TX",
          bio: "Ambitious product management student with experience in data analysis and user research. Seeking to leverage analytical skills and passion for technology in a dynamic internship role.",
          skills: "Product Strategy, Data Analysis, User Research, SQL, Python, Figma, Agile/Scrum",
          education: "Bachelor of Science in Business Administration, University of Texas at Austin (Expected May 2024)",
          experience: "Research Assistant at UT Product Lab (Jan 2023 - Present), Marketing Intern at StartupXYZ (Summer 2022)"
        });
        
        toast({
          title: "Resume Uploaded Successfully",
          description: `Your resume "${file.name}" has been saved and your profile has been automatically updated.`,
        });
        
        // Clear both file inputs and selected file
        const initialInput = document.getElementById('resume-upload') as HTMLInputElement;
        const updateInput = document.getElementById('resume-upload-update') as HTMLInputElement;
        if (initialInput) initialInput.value = '';
        if (updateInput) updateInput.value = '';
        setSelectedFile(null);
      };

      reader.onerror = (error) => {
        console.error('FileReader error:', error);
        setIsUploading(false);
        setSelectedFile(null);
        toast({
          title: "Upload Failed",
          description: "There was an error reading your file. Please try again.",
          variant: "destructive",
        });
      };

      // Read file as data URL (base64)
      reader.readAsDataURL(file);
      
    } catch (error) {
      console.error('Error uploading resume:', error);
      setIsUploading(false);
      setSelectedFile(null);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Profile</h2>
        <div className="flex space-x-2">
          {isEditing ? (
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Resume Upload Section - Now at Top */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Resume Management
            {resumeUploaded && (
              <span className="text-sm text-green-600 font-normal">✓ Resume Uploaded</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {resumeUploaded ? (
            <div className="text-center p-6 border-2 border-green-200 bg-green-50 rounded-lg">
              <div className="text-green-600 mb-2">✓ Resume Successfully Uploaded</div>
              <p className="text-sm text-muted-foreground mb-4">
                Your resume has been processed and your profile has been updated automatically.
              </p>
              <div className="flex space-x-2 justify-center">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload-update"
                />
                <Button 
                  variant="outline" 
                  className="cursor-pointer" 
                  disabled={isUploading}
                  onClick={handleUpdateResume}
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin mr-2" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Update Resume
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={handleResumeDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center p-6 border-2 border-dashed border-border rounded-lg">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Upload Resume</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload your resume to automatically update your profile
              </p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              <div className="space-y-2">
                {selectedFile && !isUploading && (
                  <div className="p-2 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-700">
                      Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  </div>
                )}
                <Button 
                  className="cursor-pointer" 
                  disabled={isUploading}
                  onClick={handleInitialUpload}
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Uploading...
                    </>
                  ) : (
                    'Choose File'
                  )}
                </Button>
                <p className="text-xs text-muted-foreground">
                  Supported formats: PDF, DOC, DOCX (max 5MB)
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={profile.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                disabled={!isEditing}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Professional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Textarea
                id="skills"
                value={profile.skills}
                onChange={(e) => handleInputChange("skills", e.target.value)}
                disabled={!isEditing}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Textarea
                id="education"
                value={profile.education}
                onChange={(e) => handleInputChange("education", e.target.value)}
                disabled={!isEditing}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              <Textarea
                id="experience"
                value={profile.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
                disabled={!isEditing}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Profile Completeness - Now at Bottom */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Completeness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Profile Complete</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
              <p className="text-xs text-muted-foreground">
                Add more skills and experience to improve your match rate!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfile;