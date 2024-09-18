import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

type IconContainerProps = {
  children: React.ReactNode;
  className?: string;
  message?: string;
  onClick: () => void;
};

const IconContainer = ({
  children,
  className,
  message,
  onClick
}: IconContainerProps) => {
  return (
    <Tooltip>
      <TooltipTrigger
        className={`bg-gray-200 active:bg-gray-300 dark:bg-gray-700 dark:active:bg-gray-800 border-none outline-none m-1 rounded-full size-12 flex flex-col items-center justify-center cursor-pointer ease-in-out duration-300 ${className}`}
        onClick={() => onClick()}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>{message}</TooltipContent>
    </Tooltip>
  );
};

export default IconContainer;
