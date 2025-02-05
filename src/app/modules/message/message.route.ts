import express from "express";
import { auth } from "../../middlewares";
import { USER_ROLE } from "../user/user.constant";
import { MessageControllers } from "./message.controller";

const router = express.Router();

router.post(
  "/new-message",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  MessageControllers.newMessage
);

router.get(
  "/get-all-messages/:chatId",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  MessageControllers.getAllMessages
);

export const MessageRoutes = router;
