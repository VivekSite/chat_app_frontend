import UserBox from "./UserBox";
import { useData } from "@/hooks";

const UsersList = () => {
  const { users } = useData();

  return (
    <>
      <h2 className="text-2xl uppercase ml-4 mt-2">Peoples</h2>
      {users.map((user) => (
        <UserBox
          key={user._id}
          username={user.username}
          avatar={user.profileImage || ""}
        />
      ))}
    </>
  );
};

export default UsersList;
