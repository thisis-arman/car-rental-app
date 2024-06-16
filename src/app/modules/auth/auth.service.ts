import { TUser } from "../User/user.interface";
import { User } from "../User/user.model";

const loginUser = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const changePassword = async (query: Record<string, unknown>) => {
  const result = await User.find(query);
  return result;
};
const refreshToken = async (query: Record<string, unknown>) => {
  const result = await User.find(query);
  return result;
};



export const authServices = {
  loginUser,
    changePassword,
  refreshToken

};
