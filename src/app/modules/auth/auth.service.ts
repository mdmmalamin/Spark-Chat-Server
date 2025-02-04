import config from "../../config";
import { AppError } from "../../errors";
import { httpStatus, jwtToken } from "../../utils";
import { USER_ROLE } from "../user/user.constant";
import { User } from "../user/user.model";
import { TRegisterUser } from "./auth.interface";

const registerUserIntoDB = async (payload: TRegisterUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload?.email);

  if (user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is already exist!');
  }

  payload.role = USER_ROLE.USER;

  //create new user
  const newUser = await User.create(payload);

  //create token and sent to the  client
  const jwtPayload = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    status: newUser.status,
  };

  const accessToken = jwtToken.generateToken(
    jwtPayload,
    config.jwt.access_secret as string,
    config.jwt.access_expires_in as string
  );

  const refreshToken = jwtToken.generateToken(
    jwtPayload,
    config.jwt.refresh_secret as string,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const loginUserFromDB = async (payload: any) => {
  console.log(payload);
};

export const AuthServices = {
  registerUserIntoDB,
  loginUserFromDB,
};
