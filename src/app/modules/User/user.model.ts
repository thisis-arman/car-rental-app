import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";



const userSchema = new Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ["admin", "user"] },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});



userSchema.statics.isUserExists = async function (
  email: string
): Promise<TUser | null> {
  return this.findOne({email}).exec();
};


export const User = model<TUser, UserModel>("User", userSchema);

