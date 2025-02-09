import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import Test from "./test"


export default async function DashboardPage() {
  const session = await getServerSession()

  if (!session) {
    redirect("/auth/login")
  }

  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <p>Welcome to your dashboard, {session.user?.email}!</p>

      <div>
        <Test/>
      </div>
    </div>
  )
}

