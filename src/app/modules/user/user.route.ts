import express from "express";
import { UserControllers } from "./user.controller";
import { auth } from "../../middlewares";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.get(
  "/my-profile",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  UserControllers.getMyProfile
);

router.get(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  UserControllers.getAllUsers
);

router.get(
  "/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  UserControllers.getSingleUser
);

export const UserRoutes = router;
