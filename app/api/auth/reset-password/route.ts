import { NextRequest, NextResponse } from "next/server";
import { ResetPasswordSchema } from "@/lib/validations/auth";
import db from "@/lib/db";
import User from "@/models/User";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    await db();
    const body = await req.json();
    const validatedData = ResetPasswordSchema.parse(body);

    const user = await User.findOne({
      email: validatedData.email,
      resetPasswordCode: validatedData.code,
      resetPasswordCodeExpiry: { $gt: new Date() }
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired reset code" },
        { status: 400 }
      );
    }

    user.password = validatedData.newPassword;
    user.resetPasswordCode = "";
    await user.save();

    return NextResponse.json(
      { message: "Password reset successful" },
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