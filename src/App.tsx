import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ScrollToTop } from "@/components/ScrollToTop";

import Index from "./pages/Index";
import About from "./pages/About";
import KidsClasses from "./pages/classes/Kids";
import AdultClasses from "./pages/classes/Adults";
import PrivateClasses from "./pages/classes/Private";
import Coaches from "./pages/Coaches";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";
import Join from "./pages/Join";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="nairobi-tkd-theme">
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
