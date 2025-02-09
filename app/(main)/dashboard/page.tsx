import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import Content from "@/components/content"


export default async function DashboardPage() {
  const session = await getServerSession()

  if (!session) {
    redirect("/auth/login")
  }

  return <Content />
}

