import type React from "react"
import MouseMoveEffect from "@/components/mouse-move-effect"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <main className="w-full max-w-md mx-auto p-6">
        <MouseMoveEffect />
        {children}
      </main>
    </div>
  )
}

