import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ["admin", "user"] },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    // isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isUserExists = async function (
  email: string
): Promise<TUser | null> {
  return this.findOne({ email }).exec();
};

userSchema.pre("save", async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});



userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

userSchema.pre("findOne", async function (next) { 
  next();
})



userSchema.statics.isPasswordMatched = async function (
  plainPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const User = model<TUser, UserModel>("User", userSchema);
