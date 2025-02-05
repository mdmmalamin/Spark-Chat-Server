import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { ChatRoutes } from "../modules/chat/chat.route";
import { MessageRoutes } from "../modules/message/message.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/chats",
    route: ChatRoutes,
  },
  {
    path: "/messages",
    route: MessageRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
