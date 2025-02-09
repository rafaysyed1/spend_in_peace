import LoginForm from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="container max-w-md mx-auto mt-20">
      <div className="p-8 rounded-xl border border-muted">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <LoginForm />
      </div>
    </div>
  )
}

