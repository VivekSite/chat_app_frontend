import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "lucide-react";
import { formatTimestamp } from "@/lib/dateUtils";
import { Conversation, MongoUser } from "@/types/types";
import { useAuth } from "@/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ConversationBoxProps = {
  isActive: boolean;
  conversation: Conversation;
};

const ConversationBox = ({
  conversation,
  isActive,
}: ConversationBoxProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [otherUser, setOtherUser] = useState<MongoUser | undefined | null>(
    null
  );

  useEffect(() => {
    if (!conversation.isGroup) {
      setOtherUser(
        conversation.userIds?.find((mongoUser) => mongoUser._id !== user?.id)
      );
    }
  }, [conversation.isGroup, conversation.userIds, user?.id]);

  return (
    <div
      className={`mx-2 p-2 mt-5 rounded-lg bg-gray-800 flex items-center gap-2 border border-gray-700 shadow-md ${
        isActive && "bg-purple-800 border-purple-700"
      } hover:cursor-pointer`}
      onClick={() => navigate(`/conversations/${conversation._id}`)}
    >
      <Avatar>
        <AvatarImage
          src={
            conversation.profileImage
              ? conversation.groupName
              : otherUser?.profileImage
          }
        />
        <AvatarFallback className="bg-transparent">
          <User />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between">
          <p className="text-sm">
            {conversation.isGroup
              ? conversation.groupName
              : otherUser?.username || "Mr. CPP"}
          </p>
          <small className="text-gray-400 text-xs">
            {conversation.lastMessage?.created_at &&
              formatTimestamp(conversation.lastMessage?.created_at)}
          </small>
        </div>
        <small className="text-gray-400 text-xs">
          {conversation.lastMessage?.body || "Started a conversation"}
        </small>
      </div>
    </div>
  );
};

export default ConversationBox;
