import { createContext, useEffect, useState } from "react";

type SocketProviderProps = {
  children: React.ReactNode;
};

type SocketProviderState = {
  socket: WebSocket | null;
  setSocket: (socket: WebSocket) => void;
};

const initialState: SocketProviderState = {
  socket: null,
  setSocket: () => null,
};

export const SocketProviderContext =
  createContext<SocketProviderState>(initialState);

export function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const url: string = `ws://localhost:8080`;

  useEffect(() => {
    if (!socket) {
      const newWSConnection = new WebSocket(url);
      setSocket(newWSConnection);
    }
  }, [socket, url]);

  const value = {
    socket,
    setSocket: (socket: WebSocket) => {
      setSocket(socket);
    },
  };

  return (
    <SocketProviderContext.Provider value={value}>
      {children}
    </SocketProviderContext.Provider>
  );
}
