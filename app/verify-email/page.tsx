import OTPVerificationForm from "@/components/otp-verification-form"

export default function VerifyEmailPage() {
  return (
    <div className="container max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-6">Verify Your Email</h1>
      <OTPVerificationForm />
    </div>
  )
}

