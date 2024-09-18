import { createContext, useEffect, useState } from "react";
import { getAuthStatus, LogOut, refreshToken } from "@/services/auth.service";
import { AuthUser } from "@/types/types";
import LoaderComponent from "@/components/LoaderComponent";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthProviderState = {
  user: AuthUser | null;
  isLoggedIn: boolean;
  checkAuthStatus: () => Promise<void>;
  logout: () => Promise<void>;
};

const initialState: AuthProviderState = {
  user: null,
  isLoggedIn: false,
  checkAuthStatus: async () => {},
  logout: async () => {},
};

export const AuthProviderContext =
  createContext<AuthProviderState>(initialState);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const logout = async () => {
    await LogOut();
    setUser(null);
    setIsLoggedIn(false);
  };

  const checkAuthStatus = async () => {
    const response = await getAuthStatus();

    if (response.success) {
      setUser(response.auth);
      setIsLoggedIn(true);
    } else if (
      response.message &&
      response.message.includes("Expired signature")
    ) {
      const newResponse = await refreshToken();
      if (newResponse.success) {
        setUser(newResponse.auth);
        setIsLoggedIn(true);
      }
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value = {
    logout,
    user,
    isLoggedIn,
    checkAuthStatus,
  };

  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
}
