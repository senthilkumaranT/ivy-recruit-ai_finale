import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bot, Mic, MicOff, Play, CheckCircle, Video, VideoOff, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIInterviewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  job: any;
}

const AIInterviewModal = ({ isOpen, onOpenChange, job }: AIInterviewModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [micPermission, setMicPermission] = useState<'checking' | 'granted' | 'denied'>('checking');
  const [videoPermission, setVideoPermission] = useState<'checking' | 'granted' | 'denied'>('checking');
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const questions = [
    "Tell me about yourself and why you're interested in this Product Management internship.",
    "How would you prioritize features for a mobile app with limited development resources?",
    "Describe a time when you had to analyze data to make a decision. Walk me through your process.",
    "If you were launching a new product feature, how would you measure its success?",
    "How would you handle conflicting feedback from different stakeholders about a product direction?"
  ];

  // Check media permissions when modal opens
  useEffect(() => {
    if (isOpen) {
      checkMediaPermissions();
    }
    return () => {
      // Clean up media stream when modal closes
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        setMediaStream(null);
      }
    };
  }, [isOpen]);

  // Update video element when media stream changes
  useEffect(() => {
    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  const checkMediaPermissions = async () => {
    try {
      // Check microphone permission
      const micPermission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      setMicPermission(micPermission.state === 'granted' ? 'granted' : 'denied');

      // Check camera permission
      const cameraPermission = await navigator.permissions.query({ name: 'camera' as PermissionName });
      setVideoPermission(cameraPermission.state === 'granted' ? 'granted' : 'denied');

      // Request media access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: true 
      });
      
      setMediaStream(stream);
      setMicPermission('granted');
      setVideoPermission('granted');
      
      toast({
        title: "Media Access Granted",
        description: "Microphone and camera are ready for your interview.",
      });
    } catch (error) {
      console.error('Error accessing media:', error);
      setMicPermission('denied');
      setVideoPermission('denied');
      
      toast({
        title: "Media Access Required",
        description: "Please allow microphone and camera access to continue with the interview.",
        variant: "destructive",
      });
    }
  };

  const requestMediaAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: true 
      });
      
      setMediaStream(stream);
      setMicPermission('granted');
      setVideoPermission('granted');
      
      toast({
        title: "Media Access Granted",
        description: "You can now proceed with the interview.",
      });
    } catch (error) {
      console.error('Error requesting media access:', error);
      toast({
        title: "Media Access Denied",
        description: "Please enable microphone and camera permissions in your browser settings.",
        variant: "destructive",
      });
    }
  };

  const handleStartInterview = () => {
    setCurrentStep(1);
    setAnswers([]);
    setCurrentAnswer("");
  };

  const handleNextQuestion = () => {
    if (currentAnswer.trim()) {
      setAnswers([...answers, currentAnswer]);
      setCurrentAnswer("");
      
      if (currentStep < questions.length) {
        setCurrentStep(currentStep + 1);
      } else {
        handleCompleteInterview();
      }
    }
  };

  const handleCompleteInterview = () => {
    toast({
      title: "Interview Completed!",
      description: "Your responses have been submitted. You'll receive feedback within 24 hours.",
    });
    onOpenChange(false);
    // Reset state
    setCurrentStep(0);
    setAnswers([]);
    setCurrentAnswer("");
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real implementation, this would start/stop audio recording
    if (!isRecording) {
      toast({
        title: "Recording Started",
        description: "Speak your answer clearly. Click the mic again to stop recording.",
      });
    } else {
      toast({
        title: "Recording Stopped",
        description: "Your response has been captured. You can edit it below before submitting.",
      });
      // Mock: Add some sample text when stopping recording
      if (!currentAnswer.trim()) {
        setCurrentAnswer("This is a sample transcribed answer. In a real implementation, this would contain the actual transcribed speech.");
      }
    }
  };

  const progress = currentStep === 0 ? 0 : ((currentStep - 1) / questions.length) * 100;

  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-primary" />
            <span>AI Interview - {job.title}</span>
          </DialogTitle>
          <DialogDescription>
            Complete this 5-minute AI interview to apply for the position at {job.company}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {currentStep === 0 ? (
            <div className="space-y-4">
              {/* Media Permission Check */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Video className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-semibold">Media Setup</h3>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Mic className="h-5 w-5" />
                        <span>Microphone</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {micPermission === 'checking' && <div className="w-4 h-4 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />}
                        {micPermission === 'granted' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                        {micPermission === 'denied' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                        <span className={`text-sm ${micPermission === 'granted' ? 'text-green-600' : micPermission === 'denied' ? 'text-red-600' : 'text-gray-500'}`}>
                          {micPermission === 'checking' ? 'Checking...' : micPermission === 'granted' ? 'Ready' : 'Not Available'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Video className="h-5 w-5" />
                        <span>Camera</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {videoPermission === 'checking' && <div className="w-4 h-4 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />}
                        {videoPermission === 'granted' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                        {videoPermission === 'denied' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                        <span className={`text-sm ${videoPermission === 'granted' ? 'text-green-600' : videoPermission === 'denied' ? 'text-red-600' : 'text-gray-500'}`}>
                          {videoPermission === 'checking' ? 'Checking...' : videoPermission === 'granted' ? 'Ready' : 'Not Available'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {mediaStream && (
                    <div className="mb-4">
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                    </div>
                  )}

                  {(micPermission === 'denied' || videoPermission === 'denied') && (
                    <Alert className="mb-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Microphone and camera access is required for this AI interview. 
                        Please allow access and refresh the page if needed.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex space-x-2">
                    <Button 
                      onClick={requestMediaAccess} 
                      variant="outline"
                      disabled={micPermission === 'granted' && videoPermission === 'granted'}
                    >
                      <Video className="mr-2 h-4 w-4" />
                      Allow Media Access
                    </Button>
                    <Button 
                      onClick={handleStartInterview} 
                      disabled={micPermission !== 'granted' || videoPermission !== 'granted'}
                      className="flex-1"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Start Interview
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Interview Instructions */}
              <Card>
                <CardContent className="p-6 text-center">
                  <Bot className="mx-auto h-12 w-12 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">AI Interview Instructions</h3>
                  <p className="text-muted-foreground mb-4">
                    This interview consists of 5 questions and typically takes 3-5 minutes to complete.
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground text-left">
                    <p>• Answer each question thoughtfully and concisely</p>
                    <p>• You can use voice recording or type your responses</p>
                    <p>• Take your time - there's no rush</p>
                    <p>• You'll receive feedback within 24 hours</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
              </div>
              <Progress value={progress} className="h-2" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <Bot className="h-6 w-6 text-primary mt-1" />
                      <div className="flex-1">
                        <h4 className="font-medium mb-2">AI Interviewer</h4>
                        <p className="text-muted-foreground">{questions[currentStep - 1]}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {mediaStream && (
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <Video className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">Your Video</h4>
                      </div>
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                    </CardContent>
                  </Card>
                )}
              </div>

              <Card>
                <CardContent className="p-6">

                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <Button
                        variant={isRecording ? "destructive" : "outline"}
                        size="lg"
                        onClick={toggleRecording}
                      >
                        {isRecording ? (
                          <>
                            <MicOff className="mr-2 h-4 w-4" />
                            Stop Recording
                          </>
                        ) : (
                          <>
                            <Mic className="mr-2 h-4 w-4" />
                            Start Recording
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="text-center text-sm text-muted-foreground">
                      or type your answer below
                    </div>

                    <Textarea
                      placeholder="Type your answer here..."
                      value={currentAnswer}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />

                    <div className="flex justify-between">
                      <div className="text-sm text-muted-foreground">
                        {currentAnswer.length} characters
                      </div>
                      <Button 
                        onClick={handleNextQuestion}
                        disabled={!currentAnswer.trim()}
                      >
                        {currentStep === questions.length ? (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Complete Interview
                          </>
                        ) : (
                          "Next Question"
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIInterviewModal;