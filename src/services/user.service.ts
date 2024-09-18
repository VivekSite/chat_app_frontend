import { GET } from "@/lib/requestUtils";

export const getAllUsers = async () => {
  return await GET(`/users`);
};
