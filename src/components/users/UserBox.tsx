import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type UserBoxProps = {
  avatar: string;
  username: string;
};

const UserBox = ({ avatar, username }: UserBoxProps) => {
  return (
    <div
      className={`mx-2 p-2 mt-5 rounded-lg bg-gray-800 flex items-center gap-2 border border-gray-700 shadow-md hover:cursor-pointer`}
    >
      <Avatar>
        <AvatarImage src={avatar} />
        <AvatarFallback className="bg-transparent">
          <User />
        </AvatarFallback>
      </Avatar>
      <div className="flex justify-between gap-1 w-full">
        <p className="text-sm"> {username || "Mr. CPP"} </p>
      </div>
    </div>
  );
};

export default UserBox;
