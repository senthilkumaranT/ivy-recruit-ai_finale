import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginStudent from "./pages/LoginStudent";
import LoginCompany from "./pages/LoginCompany";
import SignupStudent from "./pages/SignupStudent";
import SignupCompany from "./pages/SignupCompany";
import StudentDashboard from "./pages/StudentDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login/student" element={<LoginStudent />} />
          <Route path="/login/company" element={<LoginCompany />} />
          <Route path="/signup/student" element={<SignupStudent />} />
          <Route path="/signup/company" element={<SignupCompany />} />
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/company" element={<CompanyDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
