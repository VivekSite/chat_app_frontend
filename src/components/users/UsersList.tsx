import { useEffect, useState } from "react";
import UserBox from "./UserBox";
import { MongoUser } from "@/types/types";
import { getAllUsers } from "@/services/user.service";
import { useLocation } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState<MongoUser[] | []>([]);
  const location = useLocation();
  const { pathname } = location;

  const fetchUsers = async () => {
    const response = await getAllUsers();

    if (response.success) {
      setUsers(response.users);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <h2 className="text-2xl uppercase ml-4 mt-2">Peoples</h2>
      {users.map((user) => (
        <UserBox
          key={user._id}
          isActive={pathname.includes(`/conversations/${user._id}`)}
          username={user.username}
          avatar={user.profileImage || ""}
          lastMessage=""
          lastMessageTime={user.created_at}
        />
      ))}
    </>
  );
};

export default UsersList;
