import { NextRequest, NextResponse } from "next/server"
import db from "@/lib/db"
import User from "@/models/User"
import { sendVerificationEmail } from "@/lib/mail"

export async function POST(req: NextRequest) {
  try {
    await db()
    const { email } = await req.json()

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    if (user.verified) {
      return NextResponse.json(
        { error: "Email is already verified" },
        { status: 400 }
      )
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
    const verifyCodeExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    user.verifyCode = verifyCode
    user.verifyCodeExpiry = verifyCodeExpiry
    await user.save()

    await sendVerificationEmail(email, verifyCode)

    return NextResponse.json(
      { message: "Verification code resent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Resend code error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}