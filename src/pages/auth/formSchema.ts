import { z } from "zod";

export const SignUpFormSchema = z
  .object({
    username: z.string().trim().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    email: z
      .string()
      .trim()
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: "Please enter a valid email",
      })
      .email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .trim()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/, {
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      }),
    confirm_password: z.string().trim(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords must match",
    path: ["confirm_password"],
  });

export const SignInFormSchema = z.object({
  email: z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .trim()
    .min(8, {
      message: "Password must be at least of 8 characters"
    })
});

export const ResetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .trim()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/, {
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      }),
    confirm_password: z.string().trim(),
    otp: z.number().min(100000).max(999999),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords must match",
    path: ["confirm_password"],
  });
