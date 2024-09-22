import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { formatMessageTime } from "@/lib/dateUtils";

type ConversationBoxProps = {
  username: string;
  avatarImage: string;
  messageTime: number;
  message: string;
  isAuthUser: boolean;
};

const ConversationBox = ({
  username,
  isAuthUser,
  avatarImage,
  message,
  messageTime,
}: ConversationBoxProps) => {
  return (
    <div
      className={`my-2 p-2 flex items-start gap-2 rounded-lg w-fit hover:bg-stone-800 ease-in-out duration-200 ${isAuthUser ? 'bg-purple-800' : ''}`}
    >
      <Avatar className="size-10">
        <AvatarImage src={avatarImage} width={35} />
        <AvatarFallback>
          <User width={35} />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1 w-full pr-2">
        <div className="flex justify-between gap-2">
          <p className="text-sm font-semibold"> {username || "Mr. CPP"} </p>
          <small className="text-gray-400 text-xs">
            {messageTime && formatMessageTime(messageTime)}{" "}
          </small>
        </div>
        <small className="text-gray-300 text-xs">
          {message || "Started a conversation with himself"}
        </small>
      </div>
    </div>
  );
};

export default ConversationBox;
