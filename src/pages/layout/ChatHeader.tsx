import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EllipsisVertical, User } from "lucide-react";
import IconContainer from "@/components/IconContainer";

type ChatHeaderProps = {
  avatarImage: string;
  username: string;
  isOnline: boolean;
};

const ChatHeader = ({ avatarImage, username, isOnline }: ChatHeaderProps) => {
  return (
    <header className="h-14 dark:bg-gray-800 rounded-t-lg lg:rounded-l-[0] flex justify-between pr-3 pl-5 items-center">
      <div className="flex gap-2 items-center">
        <Avatar className="size-10">
          <AvatarImage src={avatarImage} width={35} />
          <AvatarFallback>
            <User width={35} />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0">
          <p className="text-sm">{username || "Mr. Cpp"}</p>
          {isOnline ? (
            <small className="text-xs text-green-400">online</small>
          ) : (
            <small className="text-xs text-red-400">ofline</small>
          )}
        </div>
      </div>
      <div>
        <IconContainer
          onClick={() => {}}
          className="dark:bg-transparent dark:hover:bg-gray-700"
        >
          <EllipsisVertical />
        </IconContainer>
      </div>
    </header>
  );
};

export default ChatHeader;
