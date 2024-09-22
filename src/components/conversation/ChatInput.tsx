import { useRef } from "react";
import { Textarea } from "../ui/textarea";

type ChatInputProps = {
  className?: string;
  textAreaClass?: string;
  placeHolder?: string;
};

const ChatInput = ({
  className,
  textAreaClass,
  placeHolder,
}: ChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInputResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      if (textarea.scrollHeight > textarea.clientHeight) {
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }
  };

  return (
    <div className={`${className} p-2`}>
      <Textarea
        ref={textareaRef}
        onInput={handleInputResize}
        className={`
        bg-slate-800 
        border-2 
        dark:border-gray-700 
        dark:focus-visible:border-gray-600 
        outline-none
        h-auto resize-none
        ${textAreaClass}
      `}
        placeholder={placeHolder}
        rows={1}
      />
    </div>
  );
};

export default ChatInput;
