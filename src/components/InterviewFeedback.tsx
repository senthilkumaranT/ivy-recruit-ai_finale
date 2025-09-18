import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, TrendingUp, TrendingDown, MessageSquare, Lightbulb } from "lucide-react";

const InterviewFeedback = () => {
  const feedbackData = [
    {
      id: 1,
      jobTitle: "Product Management Intern",
      company: "TechCorp Inc.",
      interviewDate: "2024-01-20",
      overallScore: 8.5,
      categories: [
        { name: "Product Thinking", score: 9, feedback: "Excellent understanding of user needs and market dynamics" },
        { name: "Analytical Skills", score: 8, feedback: "Strong data interpretation and problem-solving approach" },
        { name: "Communication", score: 8, feedback: "Clear articulation of ideas with good storytelling" },
        { name: "Technical Knowledge", score: 8, feedback: "Good grasp of product management tools and processes" }
      ],
      strengths: [
        "Demonstrated strong user empathy",
        "Provided data-driven solutions",
        "Showed excellent prioritization skills"
      ],
      improvements: [
        "Could improve technical depth in API understanding",
        "Practice more complex estimation problems"
      ],
      recommendations: [
        "Study advanced SQL for product analytics",
        "Read 'Cracking the PM Interview' for technical preparation"
      ]
    },
    {
      id: 2,
      jobTitle: "Associate Product Manager Intern",
      company: "StartupXYZ",
      interviewDate: "2024-01-18",
      overallScore: 9.2,
      categories: [
        { name: "Product Strategy", score: 9, feedback: "Outstanding strategic thinking and market analysis" },
        { name: "Leadership", score: 9, feedback: "Natural leadership qualities and team collaboration" },
        { name: "Innovation", score: 9, feedback: "Creative problem-solving with unique perspectives" },
        { name: "Execution", score: 9, feedback: "Clear roadmap thinking and delivery focus" }
      ],
      strengths: [
        "Exceptional strategic vision",
        "Strong leadership presence",
        "Innovative solution approaches"
      ],
      improvements: [
        "Minor: Could dive deeper into metrics definition"
      ],
      recommendations: [
        "Consider reading 'Inspired' by Marty Cagan",
        "Practice with more A/B testing scenarios"
      ]
    },
    {
      id: 3,
      jobTitle: "Product Intern",
      company: "FinanceFlow",
      interviewDate: "2024-01-15",
      overallScore: 6.2,
      categories: [
        { name: "Domain Knowledge", score: 5, feedback: "Limited understanding of fintech landscape" },
        { name: "Problem Solving", score: 7, feedback: "Good logical approach but needs more structure" },
        { name: "Communication", score: 6, feedback: "Ideas were good but presentation could be clearer" },
        { name: "Product Sense", score: 7, feedback: "Decent intuition but needs more user research backing" }
      ],
      strengths: [
        "Good logical reasoning",
        "Showed enthusiasm for learning"
      ],
      improvements: [
        "Strengthen domain knowledge in fintech",
        "Practice structured problem-solving frameworks",
        "Improve presentation and storytelling skills"
      ],
      recommendations: [
        "Study fintech products and regulations",
        "Practice case studies with frameworks like CIRCLES",
        "Join product management communities for peer learning"
      ]
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 8.5) return "text-success";
    if (score >= 7) return "text-warning";
    return "text-destructive";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 8.5) return "Excellent";
    if (score >= 7) return "Good";
    return "Needs Improvement";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Interview Feedback</h2>
        <div className="text-sm text-muted-foreground">
          {feedbackData.length} interviews completed
        </div>
      </div>

      <div className="grid gap-6">
        {feedbackData.map((feedback) => (
          <Card key={feedback.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{feedback.jobTitle}</CardTitle>
                  <p className="text-muted-foreground">{feedback.company}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline">
                      {new Date(feedback.interviewDate).toLocaleDateString()}
                    </Badge>
                    <Badge variant={feedback.overallScore >= 8.5 ? "default" : feedback.overallScore >= 7 ? "secondary" : "destructive"}>
                      {getScoreBadge(feedback.overallScore)}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getScoreColor(feedback.overallScore)}`}>
                    {feedback.overallScore}
                  </div>
                  <div className="text-sm text-muted-foreground">/ 10</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Category Scores */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Star className="mr-2 h-4 w-4" />
                  Category Breakdown
                </h4>
                <div className="space-y-3">
                  {feedback.categories.map((category) => (
                    <div key={category.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{category.name}</span>
                        <span className={getScoreColor(category.score)}>{category.score}/10</span>
                      </div>
                      <Progress value={category.score * 10} className="h-2" />
                      <p className="text-xs text-muted-foreground">{category.feedback}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center text-success">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Strengths
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {feedback.strengths.map((strength, index) => (
                    <li key={index} className="text-muted-foreground">{strength}</li>
                  ))}
                </ul>
              </div>

              {/* Areas for Improvement */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center text-warning">
                  <TrendingDown className="mr-2 h-4 w-4" />
                  Areas for Improvement
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {feedback.improvements.map((improvement, index) => (
                    <li key={index} className="text-muted-foreground">{improvement}</li>
                  ))}
                </ul>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center text-primary">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Recommendations
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {feedback.recommendations.map((recommendation, index) => (
                    <li key={index} className="text-muted-foreground">{recommendation}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {feedbackData.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No interview feedback yet</h3>
          <p className="text-muted-foreground">Complete your first AI interview to receive detailed feedback and improvement suggestions.</p>
        </div>
      )}
    </div>
  );
};

export default InterviewFeedback;