import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "./components/ui/toaster.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import {
  AuthProvider,
  DataProvider,
  SocketProvider,
  ThemeProvider,
} from "@/contexts";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <AuthProvider>
      <SocketProvider>
        <DataProvider>
          <TooltipProvider>
            <StrictMode>
              <App />
              <Toaster />
            </StrictMode>
          </TooltipProvider>
        </DataProvider>
      </SocketProvider>
    </AuthProvider>
  </ThemeProvider>
);
