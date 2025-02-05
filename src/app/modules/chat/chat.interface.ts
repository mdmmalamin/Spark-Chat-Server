import { Types } from "mongoose";

export type TChat = {
  members: Types.ObjectId[];
  lastMessage: Types.ObjectId;
  unreadMessageCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
};
