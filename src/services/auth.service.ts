import { SignInFormSchema, SignUpFormSchema } from "@/pages/auth/formSchema";
import { GET, POST } from "@/lib/requestUtils";
import { z } from "zod";

export const getAuthStatus = () => {
  return GET("/auth/status");
};

export const LogOut = () => {
  return POST("/auth/logout", {});
};

export const refreshToken = () => {
  return POST("/auth/refresh-token", {});
}

export const signUp = (payload: z.infer<typeof SignUpFormSchema>) => {
  return POST("/auth/sign_up", payload);
};

export const signIn = (payload: z.infer<typeof SignInFormSchema>) => {
  return POST("/auth/sign_in", payload);
};

export const forgotPassword = (payload: { email: string }) => {
  return POST("/auth/forgot_password", payload);
};

export const resetPassword = (payload: {
  otp: number;
  password: string;
  email: string;
}) => {
  return POST("/auth/reset_password", payload);
};
