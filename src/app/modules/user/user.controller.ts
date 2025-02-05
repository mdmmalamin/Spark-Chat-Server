import { apiResponse, catchAsync, httpStatus } from "../../utils";
import { UserServices } from "./user.service";

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsersFromDB(req.query);

  apiResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Users Retrieved Successfully!",
    data: users,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const user = await UserServices.getSingleUserFromDB(req.params.id);

  apiResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Retrieved Successfully!",
    data: user,
  });
});

const getMyProfile = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await UserServices.getMyProfile(email);

  apiResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "My Profile Retrieved Successfully!",
    data: result,
  });
});

export const UserControllers = {
  getSingleUser,
  getAllUsers,
  getMyProfile,
};
