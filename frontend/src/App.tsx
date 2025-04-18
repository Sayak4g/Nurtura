
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Medical from "./pages/Medical";
import Tasks from "./pages/Tasks";
import Contacts from "./pages/Contacts";
import Footer from "./components/Layout/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/medical" element={<Medical />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
