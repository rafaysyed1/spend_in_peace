import SignupForm from "@/components/signup-form"

export default function SignupPage() {
  return (
    <div className="container max-w-md mx-auto mt-20">
      <div className="p-8 rounded-xl border border-muted">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
      <SignupForm />
      </div>
    </div>
  )
}

