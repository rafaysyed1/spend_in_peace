import { z } from "zod";

export const RegisterUserSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password cannot exceed 100 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
      confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
})

export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;


export const LoginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(1, "Password is required"),
  });

  export type LoginInput = z.infer<typeof LoginSchema>;


  
  export const VerifyEmailSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    code: z.string().length(6, "Verification code must be 6 digits"),
  });

  export type VerifyEmailInput = z.infer<typeof VerifyEmailSchema>;
  
  export const ResetPasswordRequestSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
  });

  export type ResetPasswordRequestInput = z.infer<typeof ResetPasswordRequestSchema>;
  
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


  export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;