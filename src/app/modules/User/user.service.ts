import { TUser } from "./user.interface";
import { User } from "./user.model";



// TODO:implement transition and rollback here in this function
const createUserIntoDB = async (payload: TUser) => {
  const user = await User.create(payload);
  return user;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const user = await User.find(query);
  return user;
};

const getSingleUserFromDB = async (_id: string) => {
  const user = await User.findById(_id);
  return user;
};

//TODO:implement Dynamic update in this function
const updateUserIntoDB = async (_id: string, payload: Partial<TUser>) => {
  const user = await User.findByIdAndUpdate(
    _id,
    {
      payload,
    },
    {
      $upsert: true,
        runValidators: true,
        new: true
    }
  );
  return user;
};

// TODO:implement transition and rollback here in this function
const deleteUserFromDB = async (_id: string,) => {
    const deletedUser = await User.findByIdAndUpdate(_id, {
        isDeleted: true
    })

    return deletedUser;
}

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
    updateUserIntoDB,
  deleteUserFromDB
};
