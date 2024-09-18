import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  ArrowLeft,
  LogOut,
  MessageCircleMore,
  Settings,
  User,
  Users,
} from "lucide-react";
import IconContainer from "@/components/IconContainer";
import { ModeToggle } from "@/components/ui/mode-toggler";
import { useAuth } from "@/contexts";
import { useNavigate, useLocation } from "react-router-dom";
import { AvatarFallback } from "@/components/ui/avatar";
import cpp_logo from "@/assets/images/cpp_logo.png";

const PrimarySideBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="h-full w-[5rem] mr-[1rem] lg:mr-[2rem] p-1 rounded-[10px] bg-gray-100 dark:bg-[#171717] flex flex-col justify-between">
      <div className="flex flex-col p-2 items-center">
        {/* Go Back Icon */}
        <IconContainer
          message="Go Back"
          className={`lg:hidden`}
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="text-gray-700 dark:text-white" />
        </IconContainer>

        {/* Conversations Icon */}
        <IconContainer
          message="Conversations"
          onClick={() => {}}
          className={`${
            pathname.includes("/conversations") ? "dark:bg-purple-800" : ""
          }`}
        >
          <MessageCircleMore className="text-gray-500 dark:text-gray-200" />
        </IconContainer>

        {/* Users Icon */}
        <IconContainer
          message="Users"
          onClick={() => {}}
          className={`${
            pathname === "/" ? "dark:bg-purple-800" : ""
          }`}
        >
          <Users className="text-gray-500 dark:text-gray-200" />
        </IconContainer>

        {/* LogOut Icon */}
        <IconContainer message="LogOut" onClick={logout}>
          <LogOut className="text-gray-500 dark:text-gray-200" />
        </IconContainer>
      </div>
      <div className="flex flex-col p-2 items-center">
        {/* Theme Icon */}
        <IconContainer message="Toggle Theme" onClick={() => {}}>
          <ModeToggle />
        </IconContainer>

        {/* Settings Icon */}
        <IconContainer message="Settings" onClick={() => {}}>
          <Settings className="text-gray-500 dark:text-gray-200" />
        </IconContainer>

        {/* Profile Icon */}
        <div className="size-12 m-1 bg-gray-700 rounded-full p-2 cursor-pointer">
          <Avatar className="">
            <AvatarImage src={cpp_logo} width={40} />
            <AvatarFallback className="bg-transparent">
              <IconContainer message="Profile" onClick={() => {}}>
                <User className="text-gray-500 dark:text-gray-200" width={35} />
              </IconContainer>
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default PrimarySideBar;
