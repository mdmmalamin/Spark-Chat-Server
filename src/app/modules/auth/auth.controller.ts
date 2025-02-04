import config from "../../config";
import { apiResponse, catchAsync, httpStatus } from "../../utils";
import { AuthServices } from "./auth.service";

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUserIntoDB(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

  apiResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered in successfully!",
    data: {
      accessToken,
      refreshToken,
    },
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserFromDB(req.body);

  console.log(result);
});

export const AuthControllers = {
  registerUser,
  loginUser,
};
