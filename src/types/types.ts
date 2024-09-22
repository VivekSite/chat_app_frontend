export type AuthUser = {
  id: string;
  email: string;
  name: string;
  iss?: string | undefined;
  sub?: string | undefined;
  aud?: string | string[] | undefined;
  exp?: number | undefined;
  nbf?: number | undefined;
  iat?: number | undefined;
  jti?: string | undefined;
} | null;


export type MongoUser = {
  _id: string;
  username: string;
  email: string;
  mobile?: string;
  profileImage?: string;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  updated_at: number;
  created_at: number;
}

export type Message = {
  _id: string,
  body: string;
  image: string;
  seenIds: string[];
  conversationId: string;
  senderId: string;
  updated_at: number;
  created_at: number;
}

export type Conversation = {
  _id: string;
  name: string;
  userIds: MongoUser[];
  createdBy: string;
  
  isGroup: boolean;
  groupName: string;
  admins: string[];
  profileImage: string;
  lastMessage: Message;
  messages: Message[];
  updated_at: number;
  created_at: number;
}
