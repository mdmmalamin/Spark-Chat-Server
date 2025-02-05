import { Types } from "mongoose";

export type TMessage = {
  chatId: Types.ObjectId;
  sender: Types.ObjectId;
  text: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
};
