import { catchAsync } from "../../utils";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserFromDB(req.body);

  console.log(result);
});

export const AuthControllers = {
  loginUser,
};
