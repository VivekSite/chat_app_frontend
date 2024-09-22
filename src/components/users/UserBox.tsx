import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth, useSocket } from "@/hooks";
import { MongoUser } from "@/types/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type UserBoxProps = {
  user: MongoUser;
};

const UserBox = ({ user: mongoUser }: UserBoxProps) => {
  const { socket, emitEvent } = useSocket();
  const navigate = useNavigate();

  const handleConversation = () => {
    emitEvent("conversation:new", {
      user: { id: mongoUser._id, email: mongoUser.email },
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messageHandler = (event: MessageEvent<any>) => {
    const message = JSON.parse(event.data);
    if (message.event === "conversation:new") {
      if (message.data.success) {
        alert("Conversation created successfully");
        navigate(`/conversations/${message.data.conversation._id}`);
      } else {
        alert(message.data.message);
      }
    }
    console.log("This is the message received from server:", message);
  };

  useEffect(() => {
    socket?.addEventListener("message", messageHandler);

    return () => {
      socket?.removeEventListener("message", messageHandler);
    };
  }, [socket]);

  return (
    <div
      className={`mx-2 p-2 mt-5 rounded-lg bg-gray-800 flex items-center gap-2 border border-gray-700 shadow-md hover:cursor-pointer`}
      onClick={() => handleConversation()}
    >
      <Avatar>
        <AvatarImage src={mongoUser.profileImage || ""} />
        <AvatarFallback className="bg-transparent">
          <User />
        </AvatarFallback>
      </Avatar>
      <div className="flex justify-between gap-1 w-full">
        <p className="text-sm"> {mongoUser.username || "Mr. CPP"} </p>
      </div>
    </div>
  );
};

export default UserBox;
