import express from "express";
import { auth } from "../../middlewares";
import { USER_ROLE } from "../user/user.constant";
import { ChatControllers } from "./chat.controller";

const router = express.Router();

router.post(
  "/create-new-chat",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  ChatControllers.createNewChat
);

router.get(
  "/get-all-chats",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  ChatControllers.getAllChats
);

export const ChatRoutes = router;
