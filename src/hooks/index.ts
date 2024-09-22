import {
  AuthProviderContext,
  DataProviderContext,
  SocketProviderContext,
  ThemeProviderContext,
} from "@/contexts";
import { useContext } from "react";

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

export const useSocket = () => {
  const context = useContext(SocketProviderContext);

  if (context === undefined)
    throw new Error("useSocket must be used within a SocketProvider");

  return context;
};

export const useAuth = () => {
  const context = useContext(AuthProviderContext);

  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider");

  return context;
};

export const useData = () => {
  const context = useContext(DataProviderContext);

  if (context === undefined)
    throw new Error("useData must be used within a DataProvider");

  return context;
};
