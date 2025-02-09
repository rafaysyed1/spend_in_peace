"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useRouter } from "next/navigation"

const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 digits" }),
})

export default function OTPVerificationForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  })

  function onSubmit(values: z.infer<typeof otpSchema>) {
    console.log(values)
    // Handle OTP verification
    // After successful verification, redirect to the dashboard or home page
    router.push("/")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter OTP</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  render={({ slots }) => (
                    <InputOTPGroup>
                      {slots.map((slot, index) => (
                        <InputOTPSlot key={index} {...slot} />
                      ))}
                    </InputOTPGroup>
                  )}
                  {...field}
                />
              </FormControl>
              <FormDescription>Please enter the 6-digit code sent to your email</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Verify Email
        </Button>
      </form>
    </Form>
  )
}

