"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const emailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
})

const resetSchema = z.object({
  code: z.string().length(6, { message: "Code must be 6 characters" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

export default function ResetPasswordForm() {
  const [step, setStep] = useState<"email" | "reset">("email")

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  })

  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      code: "",
      password: "",
    },
  })

  function onEmailSubmit(values: z.infer<typeof emailSchema>) {
    console.log(values)
    setStep("reset")
  }

  function onResetSubmit(values: z.infer<typeof resetSchema>) {
    console.log(values)
    // Handle password reset
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
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Request Reset Code
            </Button>
          </form>
        </Form>
      ) : (
        <Form {...resetForm}>
          <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-4">
            <FormField
              control={resetForm.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reset Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the 6-digit code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={resetForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your new password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </form>
        </Form>
      )}
      <div className="mt-4 text-center">
        <Link href="/login" className="text-sm text-primary hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  )
}

