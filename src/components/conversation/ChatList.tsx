import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { ArrowDown } from "lucide-react";
import IconContainer from "../IconContainer";

type ChatListProps = {
  className?: string;
};

const ChatList = ({ className }: ChatListProps) => {
  const [list, setList] = useState<{ isAuthUser: boolean }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(true);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setIsAtBottom(true);
    setShowScrollButton(false);
  };

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        messagesContainerRef.current;
      const isUserAtBottom = scrollTop + clientHeight >= scrollHeight - 20;
      setIsAtBottom(isUserAtBottom);

      if (!isAtBottom) {
        setShowScrollButton(true);
      }
    }
  };

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  return (
    <div
      className={`${className} m-2 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-800 scrollbar-track-transparent`}
      ref={messagesContainerRef}
      onScroll={handleScroll}
    >
      {/* <onversations List */}
      {list.map((chat, index) => (
        <div
          key={index}
          className={`flex w-full ${chat.isAuthUser ? "justify-end" : ""}`}
        >
          <MessageBox
            username={""}
            avatarImage={""}
            messageTime={1726688512218}
            message={""}
            isAuthUser={chat.isAuthUser}
          />
        </div>
      ))}
      <div ref={messagesEndRef} />
      {showScrollButton && (
        <IconContainer
          onClick={scrollToBottom}
          message={"Scroll to bottom"}
          className="fixed bottom-[4.3rem] right-4 p-2 mr-2 rounded-full shadow-lg w-[2.5rem] h-[2.5rem]"
        >
          <ArrowDown className="text-gray-500 dark:text-gray-200" />
        </IconContainer>
      )}
    </div>
  );
};

export default ChatList;
