import { GET } from "@/lib/requestUtils";

export const getAllConversations = async (userId: string) => {
  return await GET(`/conversation/${userId}`);
}