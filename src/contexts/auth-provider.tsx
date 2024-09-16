import { createContext, useEffect, useState } from "react";
import { getCookie, deleteCookie } from "@/lib/cookieUtils";
import { verifyToken } from "@/services/auth.service";
import { User } from "@/types/types";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthProviderState = {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  setIsLoggedIn: (value: boolean) => void;
};

const initialState: AuthProviderState = {
  user: null,
  isLoggedIn: false,
  setUser: () => null,
  setIsLoggedIn: () => false
};

export const AuthProviderContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const logout = () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');

    setUser(null);
  };

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      console.log('Access token');
      verifyToken(accessToken)
        .then((payload) => {
          setUser(payload);
          setIsLoggedIn(true);
        }).catch((error) => {
          console.log('[Error while verifying token]' + error)
        });
    }
  }, [user]);

  const value = {
    logout,
    user,
    setUser: () => null,
    isLoggedIn,
    setIsLoggedIn: () => false
  }

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  )
}