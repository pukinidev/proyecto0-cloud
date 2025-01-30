import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider from "./components/auth-provider.tsx";
import Routes from "./components/routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
    <AuthProvider>
      <Routes />
    </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
