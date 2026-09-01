/**
 * DIREÇÃO VISUAL: Horizonte Editorial. A aplicação preserva uma superfície
 * clara, precisa e institucional para a demonstração da Nexus Orbit.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";

function App() {
  return (
    <ErrorBoundary>
      <TooltipProvider>
        <Home />
        <Toaster position="bottom-right" richColors />
      </TooltipProvider>
    </ErrorBoundary>
  );
}

export default App;
