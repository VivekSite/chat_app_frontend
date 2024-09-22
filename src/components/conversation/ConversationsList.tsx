import ConversationBox from "./ConversationBox";
import { useLocation } from "react-router-dom";
import { useData } from "@/hooks";

const ConversationsList = () => {
  const { conversations } = useData();
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      <h2 className="text-2xl uppercase ml-4 mt-2">Conversations</h2>
      {conversations.map((conversation) => (
        <ConversationBox
          key={conversation._id}
          conversation={conversation}
          isActive={pathname.includes(`/conversations/${conversation._id}`)}
        />
      ))}
    </>
  );
};

export default ConversationsList;
