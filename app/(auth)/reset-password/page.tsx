import ResetPasswordForm from "@/components/reset-password-form"

export default function ResetPasswordPage() {
  return (
    <div className="container max-w-md mx-auto mt-20">
      <div className="p-8 rounded-xl border border-muted">
        <h1 className="text-2xl font-bold mb-6">Reset Password</h1>
        <ResetPasswordForm />
      </div>
    </div>
  )
}