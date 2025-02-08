import { NextRequest, NextResponse } from "next/server";
import { ResetPasswordRequestSchema } from "@/lib/validations/auth";
import db from "@/lib/db";
import User from "@/models/User";
import { ZodError } from "zod";
import { sendResetPasswordEmail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    await db();
    const body = await req.json();
    const validatedData = ResetPasswordRequestSchema.parse(body);

    const user = await User.findOne({ email: validatedData.email });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetCodeExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    user.resetPasswordCode = resetCode;
    user.resetPasswordCodeExpiry = resetCodeExpiry;
    await user.save();

    await sendResetPasswordEmail(user.email, resetCode);

    return NextResponse.json(
      { message: "Password reset instructions sent to email" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}