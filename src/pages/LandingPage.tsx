import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Users, Search, TrendingUp, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const LandingPage = () => {
  const benefits = [
    {
      id: 1,
      student: "Enable easy profile creation using resume uploads, with the option for manual updates as well.",
      company: "Searching candidates on multiple any filter you want it is customizable through prompt"
    },
    {
      id: 2,
      student: "Job search system with hybrid RAG + BM25 for precise job profile matching and recommendation.",
      company: "Candidate search system with hybrid ATS + RAG"
    },
    {
      id: 3,
      student: "Director Identification Number (DIN)-approved companies",
      company: "AI Driven Small 5Minutes interview based on the job application and review of each applicant"
    },
    {
      id: 4,
      student: "If a student consistently does not match, it will guide them in improving their technical stack.",
      company: "Students will be recommended even if they do not apply but match."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" />image.png
            <div className="flex items-center space-x-4">
              <Link to="/login/student">
                <Button variant="outline">Student Login</Button>
              </Link>
              <Link to="/login/company">
                <Button>Company Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
            AI-Powered PM Internship Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Connect talented students with leading companies through intelligent matching, 
            AI-driven interviews, and comprehensive career guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup/student">
              <Button size="lg" className="min-w-[200px]">
                Join as Student
              </Button>
            </Link>
            <Link to="/signup/company">
              <Button size="lg" variant="outline" className="min-w-[200px]">
                Post Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose PM InternHub?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with intuitive design to create 
              the perfect match between students and companies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Matching</h3>
              <p className="text-muted-foreground">AI-powered candidate-job matching using advanced RAG + BM25 algorithms</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Interviews</h3>
              <p className="text-muted-foreground">Quick 5-minute AI-driven interviews for efficient candidate assessment</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Companies</h3>
              <p className="text-muted-foreground">All companies are DIN-approved for your security and trust</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Skill Development</h3>
              <p className="text-muted-foreground">Personalized guidance to improve your technical stack and employability</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Comparison Table */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Platform Benefits</h2>
            <p className="text-muted-foreground">See how our platform benefits both students and hiring companies</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Header */}
              <Card className="p-6 bg-primary text-primary-foreground text-center">
                <h3 className="text-xl font-bold">BENEFITS</h3>
              </Card>
              <Card className="p-6 bg-success text-success-foreground text-center">
                <h3 className="text-xl font-bold">STUDENT</h3>
              </Card>
              <Card className="p-6 bg-warning text-warning-foreground text-center">
                <h3 className="text-xl font-bold">HIRING COMPANY</h3>
              </Card>

              {/* Benefits Rows */}
              {benefits.map((benefit) => (
                <React.Fragment key={benefit.id}>
                  <Card className="p-6 flex items-center justify-center bg-primary/5">
                    <span className="text-2xl font-bold text-primary">{benefit.id}.</span>
                  </Card>
                  <Card className="p-6">
                    <p className="text-sm leading-relaxed">{benefit.student}</p>
                  </Card>
                  <Card className="p-6">
                    <p className="text-sm leading-relaxed">{benefit.company}</p>
                  </Card>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-primary-hover">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students and companies already using PM InternHub to build successful careers and teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup/student">
              <Button size="lg" variant="secondary" className="min-w-[200px]">
                Get Started as Student
              </Button>
            </Link>
            <Link to="/signup/company">
              <Button size="lg" variant="outline" className="min-w-[200px] border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Start Hiring
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Logo size="sm" />
          </div>
          <p className="text-muted-foreground">
            Connecting talent with opportunity through intelligent technology
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;