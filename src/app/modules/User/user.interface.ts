import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser = {
  name: string;
  email: string;
  role: "admin" | "user";
  password: string;
  phone: string;
  address: string;
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser | null>;

  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
