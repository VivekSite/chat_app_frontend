import ConversationsList from "@/components/conversation/ConversationsList";
import UsersList from "@/components/users/UsersList";
import { useLocation } from "react-router-dom";

const SecondarySideBar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="h-full hidden lg:block min-w-[20rem] w-1/5 lg:rounded-l-[10px] p-2 border-r-2 dark:border-[#2C2C2C] dark:bg-[#171717]">
      {
        pathname.includes('/conversations') ? (
          <ConversationsList />
        ) : (
          <UsersList />
        )
      }
    </div>
  );
};

export default SecondarySideBar;
