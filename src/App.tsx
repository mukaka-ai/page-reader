import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AuthProvider } from "@/hooks/useAuth";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { lazy, Suspense } from "react";
import { LoadingPage } from "@/components/LoadingPage";

// Eager load critical pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import AccessDenied from "./pages/AccessDenied";

// Lazy load non-critical pages for better performance
const About = lazy(() => import("./pages/About"));
const KidsClasses = lazy(() => import("./pages/classes/Kids"));
const AdultClasses = lazy(() => import("./pages/classes/Adults"));
const PrivateClasses = lazy(() => import("./pages/classes/Private"));
const Coaches = lazy(() => import("./pages/Coaches"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Events = lazy(() => import("./pages/Events"));
const Join = lazy(() => import("./pages/Join"));

// Lazy load admin pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminCoaches = lazy(() => import("./pages/admin/AdminCoaches"));
const AdminEvents = lazy(() => import("./pages/admin/AdminEvents"));
const AdminStudents = lazy(() => import("./pages/admin/AdminStudents"));
const AdminMessages = lazy(() => import("./pages/admin/AdminMessages"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Suspense wrapper for lazy-loaded pages
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingPage />}>{children}</Suspense>
);

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="nairobi-tkd-theme">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/access-denied" element={<AccessDenied />} />
                <Route
                  path="/about"
                  element={
                    <SuspenseWrapper>
                      <About />
                    </SuspenseWrapper>
                  }
                />
                <Route
                  path="/classes/kids"
                  element={
                    <SuspenseWrapper>
                      <KidsClasses />
                    </SuspenseWrapper>
                  }
                />
                <Route
                  path="/classes/adults"
                  element={
                    <SuspenseWrapper>
                      <AdultClasses />
                    </SuspenseWrapper>
                  }
                />
                <Route
                  path="/classes/private"
                  element={
                    <SuspenseWrapper>
                      <PrivateClasses />
                    </SuspenseWrapper>
                  }
                />
                <Route
                  path="/coaches"
                  element={
                    <SuspenseWrapper>
                      <Coaches />
                    </SuspenseWrapper>
                  }
                />
                <Route
                  path="/gallery"
                  element={
                    <SuspenseWrapper>
                      <Gallery />
                    </SuspenseWrapper>
                  }
                />
                <Route
                  path="/events"
                  element={
                    <SuspenseWrapper>
                      <Events />
                    </SuspenseWrapper>
                  }
                />
                <Route
                  path="/join"
                  element={
                    <SuspenseWrapper>
                      <Join />
                    </SuspenseWrapper>
                  }
                />

                {/* Protected Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requireAdmin>
                      <SuspenseWrapper>
                        <AdminDashboard />
                      </SuspenseWrapper>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/coaches"
                  element={
                    <ProtectedRoute requireAdmin>
                      <SuspenseWrapper>
                        <AdminCoaches />
                      </SuspenseWrapper>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/events"
                  element={
                    <ProtectedRoute requireAdmin>
                      <SuspenseWrapper>
                        <AdminEvents />
                      </SuspenseWrapper>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/students"
                  element={
                    <ProtectedRoute requireAdmin>
                      <SuspenseWrapper>
                        <AdminStudents />
                      </SuspenseWrapper>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/messages"
                  element={
                    <ProtectedRoute requireAdmin>
                      <SuspenseWrapper>
                        <AdminMessages />
                      </SuspenseWrapper>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <ProtectedRoute requireAdmin>
                      <SuspenseWrapper>
                        <AdminUsers />
                      </SuspenseWrapper>
                    </ProtectedRoute>
                  }
                />

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
