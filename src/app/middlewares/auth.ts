import { NextFunction, Request, Response } from "express";
import { USER_ROLE } from "../modules/user/user.constant";
import { catchAsync, httpStatus, jwtToken } from "../utils";
import { ApiError } from "../errors";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";

export const auth = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    const decoded = jwtToken.verifyToken(
      token,
      config.jwt.access_secret as string
    ) as JwtPayload;

    const { role, email } = decoded;

    // checking if the user is exist
    const user = await User.isUserExistsByEmail(email);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "This user is not found !");
    }
    // checking if the user is already deleted

    const status = user?.status;

    if (status === "BLOCKED") {
      throw new ApiError(httpStatus.FORBIDDEN, "This user is blocked !");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }

    req.user = decoded as JwtPayload;
    console.log(req.user)
    next();
  });
};
