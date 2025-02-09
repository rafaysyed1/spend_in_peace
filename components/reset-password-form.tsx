"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ResetPasswordRequestSchema, ResetPasswordSchema } from "@/lib/validations/auth"
import type { ResetPasswordRequestInput, ResetPasswordInput } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"

export default function ResetPasswordForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState<"email" | "reset">("email")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const emailForm = useForm<ResetPasswordRequestInput>({
    resolver: zodResolver(ResetPasswordRequestSchema),
    defaultValues: {
      email: "",
    },
  })

  const resetForm = useForm<Omit<ResetPasswordInput, "email">>({
    resolver: zodResolver(
      ResetPasswordSchema.omit({ email: true })
    ),
    defaultValues: {
      code: "",
      newPassword: "",
    },
  })

  async function onEmailSubmit(values: ResetPasswordRequestInput) {
    try {
      setIsLoading(true)
      await axios.post("/api/auth/reset-password-request", values)
      
      setEmail(values.email)
      toast({
        title: "Success",
        description: "If an account exists with this email, you will receive a reset code.",
      })
      setStep("reset")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function onResetSubmit(values: Omit<ResetPasswordInput, "email">) {
    try {
      setIsLoading(true)
      await axios.post("/api/auth/reset-password", {
        email,
        ...values,
      })

      toast({
        title: "Success",
        description: "Your password has been reset successfully.",
      })

      router.push("/login")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {step === "email" ? (
        <Form {...emailForm}>
          <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
            <FormField
              control={emailForm.control}
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
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Request Reset Code"}
            </Button>
          </form>
        </Form>
      ) : (
        <Form {...resetForm}>
          <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              Reset code has been sent to {email}
            </div>
            <FormField
              control={resetForm.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reset Code</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter the 6-digit code" 
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={resetForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="Enter your new password" 
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setStep("email")}
                disabled={isLoading}
              >
                Try Different Email
              </Button>
            </div>
          </form>
        </Form>
      )}
      <div className="mt-4 text-center">
        <Link 
          href="/login" 
          className="text-sm text-primary hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </div>
  )
}