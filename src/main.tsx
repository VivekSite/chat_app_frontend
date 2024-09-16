import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./contexts/theme-provider.tsx";
import { SocketProvider } from "./contexts/socket-provider.tsx";
import { AuthProvider } from "./contexts/auth-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <SocketProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <StrictMode>
          <App />
          <Toaster />
        </StrictMode>
      </ThemeProvider>
    </SocketProvider>
  </AuthProvider>
);
