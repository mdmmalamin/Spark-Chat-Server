import { JwtPayload } from "jsonwebtoken";
import { User } from "./user.model";
import { USER_STATUS } from "./user.constant";
import { ApiError } from "../../errors";
import { httpStatus } from "../../utils";

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const result = User.find();

  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const user = await User.findById(id);

  return user;
};

const getMyProfile = async (email: string) => {
  const profile = await User.findOne({
    email,
    status: USER_STATUS.ACTIVE,
  });

  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exists!");
  }

  return profile;
};

export const UserServices = {
  getAllUsersFromDB,
  getSingleUserFromDB,
  getMyProfile,
};
