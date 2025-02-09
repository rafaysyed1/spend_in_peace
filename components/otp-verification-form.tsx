"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"

const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 digits" }),
})

type FormValues = z.infer<typeof otpSchema>

export default function OTPVerificationForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const form = useForm<FormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  })

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("verificationEmail")
    if (!storedEmail) {
      router.push("/signup")
      return
    }
    setEmail(storedEmail)
  }, [router])

  async function onSubmit(values: FormValues) {
    if (!email) return

    try {
      setIsVerifying(true)
      await axios.post("/api/auth/verify-email", {
        email,
        code: values.otp,
      })

      toast({
        title: "Success",
        description: "Email verified successfully. You can now login.",
      })

      sessionStorage.removeItem("verificationEmail")
      router.push("/login")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Invalid verification code",
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  // Add countdown effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((current) => current - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [countdown])

  const handleResendCode = async () => {
    if (!email || countdown > 0) return

    try {
      setIsResending(true)
      await axios.post("/api/auth/resend-code", { email })
      
      toast({
        title: "Success",
        description: "New verification code sent to your email",
      })
      setCountdown(60) // Start 60 second countdown
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to resend code",
        variant: "destructive",
      })
    } finally {
      setIsResending(false)
    }
  }

  if (!email) {
    return null
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                  containerClassName="gap-2 flex"
                >
                  {Array.from({ length: 6 }).map((_, i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the 6-digit code sent to {email}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <Button 
            type="submit" 
            className="w-full"
            disabled={isVerifying}
          >
            {isVerifying ? "Verifying..." : "Verify Email"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={handleResendCode}
            disabled={isResending || countdown > 0}
          >
            {countdown > 0 
              ? `Resend Code (${countdown}s)` 
              : "Resend Code"}
          </Button>
        </div>
      </form>
    </Form>
  )
}