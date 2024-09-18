import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatTimestamp } from "@/lib/dateUtils";

type UserBoxProps = {
  avatar: string;
  username: string;
  lastMessage: string;
  lastMessageTime: number;
  isActive: boolean;
};

const UserBox = ({
  avatar,
  username,
  lastMessage,
  lastMessageTime = 1726688512218,
  isActive = false,
}: UserBoxProps) => {
  return (
    <div
      className={`mx-2 p-2 mt-5 rounded-lg bg-gray-800 flex items-center gap-2 border border-gray-700 shadow-md ${
        isActive && "bg-purple-800 border-purple-700"
      }`}
    >
      <Avatar>
        <AvatarImage src={avatar} />
        <AvatarFallback className="bg-transparent">
          <User />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between">
          <p className="text-sm"> {username || "Mr. CPP"} </p>
          <small className="text-gray-400 text-xs">
            {" "}
            {lastMessageTime && formatTimestamp(lastMessageTime)}{" "}
          </small>
        </div>
        <small className="text-gray-400 text-xs">
          {" "}
          {lastMessage || "Started a conversation"}{" "}
        </small>
      </div>
    </div>
  );
};

export default UserBox;
