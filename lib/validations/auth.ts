import { z } from "zod";

export const RegisterUserSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
});

export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;


export const LoginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(1, "Password is required"),
  });
  
  export const VerifyEmailSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    code: z.string().length(6, "Verification code must be 6 digits"),
  });
  
  export const ResetPasswordRequestSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
  });
  
  export const ResetPasswordSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    code: z.string().length(6, "Reset code must be 6 digits"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain uppercase, lowercase, number and special character"
      ),
  });