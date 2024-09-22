import { AppConfig } from "@/config/env.config";
import { createContext, useEffect, useState } from "react";

type SocketProviderProps = {
  children: React.ReactNode;
};

type SocketProviderState = {
  socket: WebSocket | null;
  setSocket: (socket: WebSocket) => void;
  emitEvent: (eventName: string, data: unknown) => void;
};

const initialState: SocketProviderState = {
  socket: null,
  setSocket: () => null,
  emitEvent: () => null,
};

export const SocketProviderContext =
  createContext<SocketProviderState>(initialState);

export function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const url: string = AppConfig.SOCKET_BASE_URL;

  const emitEvent = (eventName: string, data: unknown) => {
    if (socket) {
      socket.send(
        JSON.stringify({
          event: eventName,
          data,
        })
      );
    }
  };

  const value = {
    socket,
    setSocket: (socket: WebSocket) => {
      setSocket(socket);
    },
    emitEvent,
  };

  useEffect(() => {
    if (!socket) {
      const newWSConnection = new WebSocket(url);
      setSocket(newWSConnection);
    }
  }, [socket, url]);

  return (
    <SocketProviderContext.Provider value={value}>
      {children}
    </SocketProviderContext.Provider>
  );
}
