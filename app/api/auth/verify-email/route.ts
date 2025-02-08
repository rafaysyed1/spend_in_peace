import { NextRequest, NextResponse } from "next/server";
import { VerifyEmailSchema } from "@/lib/validations/auth";
import db from "@/lib/db";
import User from "@/models/User";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    await db();
    const body = await req.json();
    const validatedData = VerifyEmailSchema.parse(body);

    const user = await User.findOne({ 
      email: validatedData.email,
      verifyCode: validatedData.code,
      verifyCodeExpiry: { $gt: new Date() }
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired verification code" },
        { status: 400 }
      );
    }

    user.verified = true;
    user.verifyCode = "";
    await user.save();

    return NextResponse.json(
      { message: "Email verified successfully" },
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