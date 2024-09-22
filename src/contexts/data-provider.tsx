import { createContext, useEffect, useState } from "react";
import { Conversation, MongoUser } from "@/types/types";
import { getAllUsers } from "@/services/user.service";
import { useAuth } from "@/hooks";
import { getAllConversations } from "@/services/conversation.service";

type DataProviderProps = {
  children: React.ReactNode;
};

type DataProviderState = {
  users: MongoUser[],
  conversations: Conversation[],
  activeConversation: Conversation | null,
  setActiveConversation: (conversation: Conversation) => void,
  setUsers: (users: MongoUser[]) => void,
  setConversations: (conversations: Conversation[]) => void,
};

const initialState: DataProviderState = {
  users: [],
  conversations: [],
  activeConversation: null,
  setActiveConversation: () => null,
  setUsers: () => [],
  setConversations: () => [],
};

export const DataProviderContext =
  createContext<DataProviderState>(initialState);

export function DataProvider({ children }: DataProviderProps) {
  const { user } = useAuth()
  const [users, setUsers] = useState<MongoUser[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);

  const fetchAllUsers = async () => {
    const data = await getAllUsers();
    if (data.success) {
      setUsers(data.users);
    }
  }

  const fetchConversations = async () => {
    const data = await getAllConversations(user?.id as string);
    if (data.success) {
      setConversations(data.conversations);
    }
  }

  useEffect(() => {
    fetchAllUsers();
    fetchConversations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    users,
    conversations,
    activeConversation,
    setUsers,
    setConversations,
    setActiveConversation
  };

  return (
    <DataProviderContext.Provider value={value}>
      {children}
    </DataProviderContext.Provider>
  );
}
