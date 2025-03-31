
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Index";
import CoursePage from "./pages/CoursePage";
import CertificatesPage from "./pages/CertificatesPage";
import QuizzesPage from "./pages/QuizzesPage";
import QuizPage from "./pages/QuizPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminQuizzes from "./pages/admin/AdminQuizzes";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminCertificates from "./pages/admin/AdminCertificates";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./layouts/AdminLayout";
import { AdminProvider } from "./contexts/AdminContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/course/:id" element={<CoursePage />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/quizzes" element={<QuizzesPage />} />
            <Route path="/quiz/:id" element={<QuizPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="quizzes" element={<AdminQuizzes />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="certificates" element={<AdminCertificates />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
