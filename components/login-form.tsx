"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/lib/validations/auth";
import type { LoginInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [showVerifyDialog, setShowVerifyDialog] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [verifying, setVerifying] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Add countdown effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((current) => current - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const form = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginInput) {
    try {
      setIsLoading(true);
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (response?.error) {
        // Check if the error is about unverified email
        if (response.error === "Please verify your email first") {
          setUnverifiedEmail(values.email);
          setShowVerifyDialog(true);
          return;
        }

        toast({
          title: "Error",
          description: response.error,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Logged in successfully",
      });

      router.push(callbackUrl);
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendVerification() {
    if (countdown > 0) return;

    try {
      setIsLoading(true);
      const response = await axios.post("/api/auth/resend-code", {
        email: unverifiedEmail,
      });

      toast({
        title: "Success",
        description:
          "Verification email has been resent. Please check your inbox.",
      });
      setCountdown(60); // Start 60 second countdown
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.error || "Failed to resend verification email",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerifyCode() {
    if (!verificationCode || verificationCode.length !== 6) return;

    try {
      setVerifying(true);
      // First verify the email
      await axios.post("/api/auth/verify-email", {
        email: unverifiedEmail,
        code: verificationCode,
      });

      // Then automatically sign in the user
      const response = await signIn("credentials", {
        email: unverifiedEmail,
        password: form.getValues("password"), // Get password from form
        redirect: false,
      });

      if (response?.error) {
        toast({
          title: "Error",
          description:
            "Email verified but login failed. Please try logging in again.",
          variant: "destructive",
        });
        setShowVerifyDialog(false);
        return;
      }

      toast({
        title: "Success",
        description: "Email verified and logged in successfully.",
      });

      setShowVerifyDialog(false);
      setVerificationCode("");
      router.push(callbackUrl);
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Invalid verification code",
        variant: "destructive",
      });
    } finally {
      setVerifying(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Link
            href="/reset-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="mt-4 text-center">
          <span className="text-sm text-muted-foreground">
            Don't have an account?{" "}
          </span>
          <Link href="/signup" className="text-sm text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </Form>

      <AlertDialog open={showVerifyDialog} onOpenChange={setShowVerifyDialog}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Email Verification Required</AlertDialogTitle>
            <AlertDialogDescription>
              Please enter the 6-digit verification code sent to{" "}
              {unverifiedEmail}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex flex-col gap-4 py-4">
            <InputOTP
              maxLength={6}
              value={verificationCode}
              onChange={(value) => setVerificationCode(value)}
              containerClassName="gap-2 flex"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTP>

            <div className="flex flex-col gap-2">
              <Button
                onClick={handleVerifyCode}
                disabled={verifying || verificationCode.length !== 6}
                className="w-full"
              >
                {verifying ? "Verifying..." : "Verify Email"}
              </Button>

              <Button
                variant="outline"
                onClick={handleResendVerification}
                disabled={isLoading || countdown > 0}
                className="w-full"
              >
                {countdown > 0
                  ? `Resend Code (${countdown}s)`
                  : isLoading
                  ? "Sending..."
                  : "Resend Code"}
              </Button>
            </div>
          </div>

          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
