import { useEffect, useState } from "react";
import Layout from "./layout/Layout";
import { useAuth, useData } from "@/hooks";
import ChatInput from "@/components/conversation/ChatInput";
import ChatHeader from "@/components/conversation/ChatHeader";
import ChatList from "@/components/conversation/ChatList";
import { Plus } from "lucide-react";
import IconContainer from "@/components/IconContainer";
import { Navigate } from "react-router-dom";
import { MongoUser } from "@/types/types";

const HomePage = () => {
  const { activeConversation } = useData();
  const { user } = useAuth();
  const [otherUser, setOtherUser] = useState<MongoUser | undefined | null>(
    null
  );

  if (!activeConversation) {
    <Navigate to={`/conversations/${user?.id}`} replace />;
  }

  useEffect(() => {
    if (!activeConversation?.isGroup) {
      setOtherUser(
        activeConversation?.userIds?.find(
          (mongoUser) => mongoUser._id !== user?.id
        )
      );
    }
  }, [activeConversation?.isGroup, activeConversation?.userIds, user?.id]);

  return (
    <Layout>
      <div className="flex flex-col h-full">
        {/* Chat Header */}
        <ChatHeader
          avatarImage={""}
          isOnline={true}
          username={
            activeConversation?.isGroup
              ? activeConversation.groupName
              : (otherUser?.username as string)
          }
          className=""
        />

        {/* List of Conversations */}
        <ChatList className="flex-1" />

        {/* Input Area */}
        <div className="flex items-center pl-2">
          <IconContainer
            onClick={() => {}}
            className="w-[2.5rem] h-[2.5rem]"
            message="Upload an Image"
          >
            <Plus className="text-gray-500 dark:text-gray-200" />
          </IconContainer>
          <ChatInput className="flex-1" textAreaClass="overflow-hidden " />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
