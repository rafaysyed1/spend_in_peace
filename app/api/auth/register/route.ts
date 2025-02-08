import { NextRequest, NextResponse } from "next/server";
import { RegisterUserSchema } from "@/lib/validations/auth";
import db from "@/lib/db";
import User from "@/models/User";
import { ZodError } from "zod";
import { sendVerificationEmail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    await db();
    const body = await req.json();
    const validatedData = RegisterUserSchema.parse(body);

    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Generate 6-digit verification code
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verifyCodeExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const newUser = await User.create({
      email: validatedData.email,
      password: validatedData.password,
      verifyCode,
      verifyCodeExpiry,
    });

    // Send verification email
    try {
      await sendVerificationEmail(validatedData.email, verifyCode);
    } catch (error) {
      // If email sending fails, delete the created user
      await User.findByIdAndDelete(newUser._id);
      return NextResponse.json(
        { error: "Failed to send verification email" },
        { status: 500 }
      );
    }

    const user = newUser.toObject();
    delete user.password;
    delete user.verifyCode; // Don't send verification code in response

    return NextResponse.json(
      {
        message: "User registered successfully. Please check your email for verification.",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Invalid input",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}