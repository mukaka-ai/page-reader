import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AuthProvider } from "@/hooks/useAuth";

import Index from "./pages/Index";
import About from "./pages/About";
import KidsClasses from "./pages/classes/Kids";
import AdultClasses from "./pages/classes/Adults";
import PrivateClasses from "./pages/classes/Private";
import Coaches from "./pages/Coaches";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";
import Join from "./pages/Join";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCoaches from "./pages/admin/AdminCoaches";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminMessages from "./pages/admin/AdminMessages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="nairobi-tkd-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/classes/kids" element={<KidsClasses />} />
              <Route path="/classes/adults" element={<AdultClasses />} />
              <Route path="/classes/private" element={<PrivateClasses />} />
              <Route path="/coaches" element={<Coaches />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/events" element={<Events />} />
              <Route path="/join" element={<Join />} />
              <Route path="/auth" element={<Auth />} />
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/coaches" element={<AdminCoaches />} />
              <Route path="/admin/events" element={<AdminEvents />} />
              <Route path="/admin/students" element={<AdminStudents />} />
              <Route path="/admin/messages" element={<AdminMessages />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
