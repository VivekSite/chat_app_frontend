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