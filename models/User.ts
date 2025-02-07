import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  verified: boolean;
  verifyCode: string;
  verifyCodeExpiry: Date;
  resetPasswordCode: string;
  resetPasswordCodeExpiry: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verifyCode: {
      type: String,
      default: "",
    },
    verifyCodeExpiry: {
      type: Date,
      default: Date.now,
    },
    resetPasswordCode: {
      type: String,
      default: "",
    },
    resetPasswordCodeExpiry: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
  }

  next();
});

const User = mongoose.models?.User || mongoose.model<IUser>("User", userSchema);
export default User;
